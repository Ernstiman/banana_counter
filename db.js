async function insert_login(username, password, email) {
    await pool.query(
      `

          INSERT INTO Banana_data (username, psw, email, count) VALUES (?, ?, ?, 0)

        `,

      [username, password, email]
    );
  }

async function set_banana_count(username, count) {
  await pool.query(`UPDATE Banana_data SET count = ? WHERE username = ?`, [
    count,
    username,
  ]);
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
  const [users] = await pool.query(
    "Select username, count FROM Banana_data WHERE username != ?",
    [username]
  );
  return users ? users : undefined;
}

async function add_follower(follower, followed) {
    await pool.query(
      "INSERT INTO Followers(follower, followed) VALUES (?, ?)",
      [follower, followed]
    );
}

async function get_followers(username) {
  let [followers] = await pool.query(
    "SELECT follower FROM Followers WHERE followed = ?",
    [username]
  );
  followers = followers.map((user) => user.follower);
  return { followers };
}

async function get_following(username) {
  let [result] = await pool.query(
    "SELECT followed FROM Followers WHERE follower = ?",
    [username]
  );
  return {following: result.map((user) => user.followed)}};

async function getUserData(users) {
  if (!users || users.length === 0) return [];
    const placeholders = users.map(() => "?").join(",");
     let [userData] = await pool.query(
      `SELECT username, count FROM Banana_data WHERE username IN (${placeholders})`,
      users
    )

  return userData;
}

async function getTotalCount() {
  const [result] = await pool.query("SELECT SUM(count) AS totalCount FROM Banana_data");
  return result[0].totalCount;
}

async function remove_follower(follower, followed) {
  if (follower && followed) {
    await pool.query(
      "DELETE FROM Followers WHERE follower = ? AND followed = ?",
      [follower, followed]
    );
  }
}

async function insert_banana_history(amount, username) {
    await pool.query(
      "INSERT INTO Banana_history (username, amount) VALUES (?, ?)",
      [username, amount]
    );
  }

async function select_banana_history(users) {
  const VALUES = users.map(() => "?").join(",");
  if (users.length > 0) {
    const [result] = await pool.query(
      `SELECT timestamp, amount, username FROM Banana_history WHERE username IN (${VALUES}) ORDER BY timestamp DESC;`,
      users
    );
    return result;
  }
  return;
}

async function select_friend_requests(username) {
  let [result] = await pool.query(
    "SELECT sender FROM Friend_requests WHERE receiver = ?",
    [username]
  );
  return result.map((user) => user.sender);
}

async function insert_friend_requests(sender, receiver) {
    await pool.query(
      "INSERT INTO Friend_requests (sender, receiver) VALUES (?, ?)",
      [sender, receiver]
    );
}

async function remove_friend_requests(sender, receiver) {
  await pool.query(
    "DELETE FROM Friend_requests WHERE sender = ? AND receiver = ?",
    [sender, receiver]
  );
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
  const [result] = await pool.query(
    "SELECT * FROM notification_subscriptions WHERE user_id = ?",
    [userID]
  )
  return result;
}

async function deleteNotificationSubscription(endPoint) {
  await pool.query(
    "DELETE FROM notification_subscriptions WHERE end_point = ?",
    [endPoint]
  );
}

const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER|| "root",
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE || "my_data",
};

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
  deleteNotificationSubscription
};

