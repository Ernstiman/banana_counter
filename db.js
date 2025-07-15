async function insert_login(username, password) {
  let exists = await check_login(username);

  if (!exists) {
    await pool.query(
      `

          INSERT INTO Banana_data (username, psw, count) VALUES (?, ?, 0)

        `,

      [username, password]
    );

    return true;
  }

  return false;
}

async function write_to_data_base(username, count) {
  await pool.query(`UPDATE Banana_data SET count = ? WHERE username = ?`, [
    count,

    username,
  ]);
}

async function check_login(username, password = undefined) {
  let result;
  if (password) {
    [result] = await pool.query(
      `
        SELECT * FROM Banana_data WHERE username = ? AND psw = ?
      `,
      [username, password]
    );
  } else {
    [result] = await pool.query(
      `
        SELECT * FROM Banana_data WHERE username = ?
      `,
      [username]
    );
  }
  return result.length > 0;
}

async function get_all_users(username) {
  const [users] = await pool.query(
    "Select username, count FROM Banana_data WHERE username != ?",
    [username]
  );
  return users ? users : undefined;
}

async function get_count(username) {
  const [result] = await pool.query(
    "SELECT count AS count FROM Banana_data WHERE username = ?",
    [username]
  );
  const [total] = await pool.query(
    "SELECT SUM(count) AS total FROM Banana_data"
  );
  return {
    count: result[0] ? result[0].count : 0,
    total_count: total[0] ? total[0].total : 0,
  };
}

async function add_follower(follower, followed) {
  try {
    const [result] = await pool.query(
      "INSERT INTO Followers(follower, followed) VALUES (?, ?)",
      [follower, followed]
    );
  } catch (err) {}
}

async function get_follower(username) {
  let [followed] = await pool.query(
    "SELECT followed FROM Followers WHERE follower = ?",
    [username]
  );
  let [follower] = await pool.query(
    "SELECT follower FROM Followers WHERE followed = ?",
    [username]
  );
  followed = followed.map((user) => user.followed);
  follower = follower.map((user) => user.follower);

  return { followed, follower };
}

async function get_counts_from_users(users) {
  if (users.length > 0) {
    const placeholders = users.map(() => "?").join(",");
    const [counts] = await pool.query(
      `SELECT username, count FROM Banana_data WHERE username IN (${placeholders})`,
      users
    );

    return counts;
  }
  return [];
}

async function remove_follower(follower, followed){
    if(follower && followed){
    await pool.query("DELETE FROM Followers WHERE follower = ? AND followed = ?",
        [follower, followed]
    )}
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
  write_to_data_base,
  check_login,
  get_all_users,
  get_count,
  add_follower,
  get_follower,
  get_counts_from_users,
  remove_follower
};
