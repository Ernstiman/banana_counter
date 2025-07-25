async function insert_login(username, password) {
    await pool.query(
      `

          INSERT INTO Banana_data (username, psw, count) VALUES (?, ?, 0)

        `,

      [username, password]
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
    const [result] = await pool.query(
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

async function get_count(users) {
  let count = [];
  console.log(users)
  if (users.length > 0) {
    const placeholders = users.map(() => "?").join(",");
     [count] = await pool.query(
      `SELECT username, count FROM Banana_data WHERE username IN (${placeholders})`,
      users
    );
  }
  const [total_count] = await pool.query(
    "SELECT SUM(count) AS total_count FROM Banana_data"
  );
  return {count, total_count}
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

const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "viktor",
  password: "MY_sql_pass!123",
  database: "my_data",
};

const pool = mysql.createPool(dbConfig);

module.exports = {
  pool,
  insert_login,
  set_banana_count,
  check_login,
  get_all_users,
  get_count,
  add_follower,
  get_followers,
  remove_follower,
  insert_banana_history,
  select_banana_history,
  select_friend_requests,
  insert_friend_requests,
  remove_friend_requests,
  get_following
};
