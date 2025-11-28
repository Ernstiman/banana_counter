const URL = require("url");
const { client } = require("./redisInit");

const exTime = 3600;

async function insert_login(username, password, email) {
    await pool.query(
      `

          INSERT INTO Banana_data (username, psw, email, count) VALUES (?, ?, ?, 0)

        `,

      [username, password, email]
    );
  }

async function set_banana_count(username, count) {
  const cacheKey1 = `usersData:${username}`; 
  const cacheKey2 = `userData:${username}`; 
  await pool.query(`UPDATE Banana_data SET count = ? WHERE username = ?`, [
    count,
    username,
  ]);
  await client.del(cacheKey1);
  await client.del(cacheKey2);
}

async function check_login(username, password) {
    let [result] = await pool.query(
      `
        SELECT * FROM Banana_data WHERE username = ? AND psw = ?
      `,
      [username, password]
    );
    return result.length > 0;
  }

async function get_all_users(username) {
  const cacheKey = `users`;
  const cacheData = await client.get(cacheKey);
  if(cacheData){
    return JSON.parse(cacheData); 
  }
  const [users] = await pool.query(
    "Select username, count FROM Banana_data WHERE username != ?",
    [username]
  );
  if(users){
    await client.set(cacheKey, JSON.stringify(users), {EX: exTime});
    return users;
  }
  return null;
}

async function add_follower(follower, followed) {
    const cacheKey1 = `followers:${followed}`;
    const cacheKey2 = `following:${follower}`;
    await pool.query(
      "INSERT INTO Followers(follower, followed) VALUES (?, ?)",
      [follower, followed]
    );
    await client.del(cacheKey1);
    await client.del(cacheKey2);
}

async function get_followers(username) {
  const cacheKey = `followers:${username}`;
  const cachedFollowers = await client.get(cacheKey);
  if (cachedFollowers){ 
    return {followers: JSON.parse(cachedFollowers)};
  }
  let [followers] = await pool.query(
    "SELECT follower FROM Followers WHERE followed = ?",
    [username]
  );
  followers = followers.map((user) => user.follower);
  await client.set(cacheKey, JSON.stringify(followers), {EX: exTime});
  // As the query returns a pair (followers, following) we have to return a record containing only the followers
  return { followers };
}

async function get_following(username) {
  const cacheKey = `following:${username}`;

  const cachedFollowers = await client.get(cacheKey);
  if (cachedFollowers){ 
    return {following: JSON.parse(cachedFollowers)};
  }
  let [result] = await pool.query(
    "SELECT followed FROM Followers WHERE follower = ?",
    [username]
  );

  const following = result.map((user) => user.followed);
  await client.set(cacheKey, JSON.stringify(following), {EX: exTime});
  return {following}
};

async function getUserData(users, userID) {
  if (!users || users.length === 0) return []; //users empty
  // If the users.length == 1 then we only want the data from that specific user, otherwise we want the data for all the users from
  // the sessions user
  const cacheKey = users.length == 1 ? `userData:${users[0]}` : `usersData:${userID}`; 
  const cacheData = await client.get(cacheKey);
  if(cacheData){
    return JSON.parse(cacheData);
  }
  const placeholders = users.map(() => "?").join(",");
  console.log("Nu läste jag från minnet!!!!!! ");
    let [userData] = await pool.query(
    `SELECT username, count FROM Banana_data WHERE username IN (${placeholders})`,
    users
  )
  await client.set(cacheKey, JSON.stringify(userData), {EX: exTime});
  return userData;
}

async function getTotalCount() {
  const cacheKey = "totalCount"
  const cacheData = await client.get(cacheKey);
  if(cacheData){
    return JSON.parse(cacheData);
  }
  const [result] = await pool.query("SELECT SUM(count) AS totalCount FROM Banana_data");
  await client.set(cacheKey, JSON.stringify(result[0].totalCount), {EX: exTime});
  return result[0].totalCount;
}

async function remove_follower(follower, followed) {
  const cacheKey = `followers:${followed}`;
  if (follower && followed) {
    await pool.query(
      "DELETE FROM Followers WHERE follower = ? AND followed = ?",
      [follower, followed]
    );
  }
  await client.del(cacheKey);
}

async function insert_banana_history(amount, username, caption) {
    await pool.query(
      "INSERT INTO Banana_history (username, amount, caption) VALUES (?, ?, ?)",
      [username, amount, caption]
    );
    await client.del(`banana_history`);
    await client.del(`banana_history:${username}`);
  }

async function select_banana_history(users, offset) {
  const LIMIT = 10;
  let cacheKey;
  if(users && users.length > 1){
    cacheKey = `banana_history`;
  }
  else{
    cacheKey = `banana_history:${users[0]}`;
  }
  const offsetCacheKey = `offset:${users[0]}`
  const cacheData = await client.get(cacheKey);
  const prevOffset = await client.get(offsetCacheKey);
  // if(cacheData && offset <= JSON.parse(prevOffset)){
  //   return JSON.parse(cacheData);
  // }
  const VALUES = users.map(() => "?").join(",");
  if (users.length > 0) {
    const [result] = await pool.query(
      `SELECT timestamp, amount, username, caption FROM Banana_history WHERE username IN (${VALUES}) ORDER BY timestamp DESC LIMIT ${LIMIT} OFFSET ${offset};`,
      users
    );
    await client.set(cacheKey, JSON.stringify(result), {EX: exTime});
    await client.set(offsetCacheKey, JSON.stringify(offset));
    return result;
  }
  return;
}

async function select_friend_requests(username) {
  const cacheKey = `friend_request:${username}`;
  const cacheData = await client.get(cacheKey);
  if(cacheData){
    return JSON.parse(cacheData);
  }
  let [result] = await pool.query(
    "SELECT sender FROM Friend_requests WHERE receiver = ?",
    [username]
  );
  const senders = result.map((user) => user.sender);
  await client.set(cacheKey, JSON.stringify(senders), {EX:exTime});
  return senders;
}

async function insert_friend_requests(sender, receiver) {
    const cacheKey1 = `friend_request:${receiver}`;
    const cacheKey2 = `friend_request:${sender}`;
    await pool.query(
      "INSERT INTO Friend_requests (sender, receiver) VALUES (?, ?)",
      [sender, receiver]
    );
    await client.del(cacheKey1);
    await client.del(cacheKey2);
}

async function remove_friend_requests(sender, receiver) {
  const cacheKey1 = `friend_request:${receiver}`;
  const cacheKey2 = `friend_request:${sender}`;
  await pool.query(
    "DELETE FROM Friend_requests WHERE sender = ? AND receiver = ?",
    [sender, receiver]
  );
  await client.del(cacheKey1);
  await client.del(cacheKey2);
}

async function changePassword(email, newPassword) {
  await pool.query(
    "UPDATE Banana_data SET psw = ? WHERE email = ?",
    [newPassword, email]
  );
}

async function insertPasswordReset(email, token, expire) {
  await pool.query(
    "INSERT INTO Password_resets (email, token, expire) VALUES (?, ?, ?)",
    [email, token, expire]
  );
}

async function getPasswordReset(token){
  const [result] = await pool.query(
    "SELECT email FROM Password_resets WHERE token = ? AND expire > NOW()",
    [token]
  );
  return result[0] ? result[0].email : null;
}

async function deletePasswordReset(email) {
  await pool.query(
    "DELETE FROM Password_resets WHERE email = ?",
    [email]
  );
}

async function insertNotificationSubscription(userId, endPoint, p256dh, auth) {
  await pool.query(
    "INSERT INTO notification_subscriptions (user_id, end_point, p256dh, auth) VALUES (?, ?, ?, ?)",
    [userId, endPoint, p256dh, auth]
  );
}

async function selectSubscriptions(userID){
  let [result] = await pool.query(
    "SELECT * FROM notification_subscriptions WHERE user_id = ?",
    [userID]
  )
  const subsciptions = result.map(sub => ({endpoint : sub.end_point, keys: {
    p256dh: sub.p256dh, auth: sub.auth}}))
  return subsciptions;
}

async function deleteNotificationSubscription(endPoint) {
  await pool.query(
    "DELETE FROM notification_subscriptions WHERE end_point = ?",
    [endPoint]
  );
}

async function getSettings(username){

    const cacheKey = `settings:${username}`;
    const cacheData = await client.get(cacheKey);

    if(cacheData){
      return JSON.parse(cacheData);
    }

    let [result] = await pool.query(
      "SELECT * FROM Settings WHERE username = ?",
      [username]
    )

    if(result[0]){
      await client.set(cacheKey, JSON.stringify(result[0]), {EX: exTime});
       result[0].darkMode = result[0].darkMode ? true : false;
       return result[0];
    }

    return {darkMode: false};
}

async function postSettings(settings, username){
  const cacheKey = `settings:${username}`;
  await pool.query(
    "REPLACE INTO Settings (username, darkMode) VALUES (?, ?)",
  [username, settings.darkMode]);
  await client.del(cacheKey);
}

async function clearSettings(){
  await pool.query(
    "DELETE FROM Settings"
  );
}

const mysql = require("mysql2/promise");


   dbConfig = {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER|| process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME
   }



const pool = mysql.createPool(dbConfig);

module.exports = {
  pool,
  insert_login,
  set_banana_count,
  check_login,
  get_all_users,
  add_follower,
  get_followers,
  remove_follower,
  insert_banana_history,
  select_banana_history,
  select_friend_requests,
  insert_friend_requests,
  remove_friend_requests,
  get_following,
  changePassword,
  getUserData,
  getTotalCount,
  insertPasswordReset,
  getPasswordReset,
  deletePasswordReset,
  insertNotificationSubscription,
  selectSubscriptions,
  deleteNotificationSubscription,
  getSettings,
  postSettings,
  clearSettings
};

