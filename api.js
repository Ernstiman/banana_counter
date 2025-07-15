const {
  pool,
  insert_login,
  write_to_data_base,
  check_login,
  get_count,
  add_follower,
  get_follower,
  get_counts_from_users,
  get_all_users,
  remove_follower,
} = require("./db.js");
const { rövarencrypt } = require("./utils.js");
var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cors = require("cors");

const session = require("express-session");

var app = express();

const BANANA_DATA_SQL_PATH = path.join(__dirname, "Banana_data.sql");
const FOLLOWERS_SQL_PATH = path.join(__dirname, "Followers.sql");
const BANANA_HISTORY_SQL_PATH = path.join(__dirname, "Banana_history.sql")
const PORT = 4747;

var server = http.createServer(app);
banana_data_init = fs.readFileSync(BANANA_DATA_SQL_PATH, "utf-8");
followers_init = fs.readFileSync(FOLLOWERS_SQL_PATH, "utf-8");
banana_history_init = fs.readFileSync(BANANA_HISTORY_SQL_PATH, "utf-8");

async function main() {
  await pool.query(banana_data_init);

  await pool.query(followers_init);

  await pool.query(banana_history_init)
  
  server.listen(PORT);
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/api/get-users", async (req, res) => {
  try {
    let users = await get_all_users(req.session.username);
    res.json(users);
  } catch (err) {
    error(err, res);
  }
});

app.get("/main.html", (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/index.html");
  }
  next();
});

app.get("/api/me", (req, res) => {
  res.json({ username: req.session.username });
});

app.get("/api/get-count", async (req, res) => {
  let username = req.session.username;

  try {
    let { count, total_count } = await get_count(username);
    return res.json({
      count,
      total_count,
    });
  } catch (err) {
    error(err, res);
  }
});

app.get("/api/get-user-count", async (req, res) => {
  let username = req.query.username;

  try {
    let { count, total_count } = await get_count(username);
    res.json({
      count,
      total_count,
    });
  } catch (err) {
    error(err, res);
  }
});

app.get("/api/get-follower", async (req, res) => {
  const username = req.session.username;
  let followed_data = [];
  let follower_data = [];

  try {
    const followers = await get_follower(username);
    followed_data = await get_counts_from_users(followers.followed);
    follower_data = await get_counts_from_users(followers.follower);
    res.json({ followed_data, follower_data });
  } catch (err) {
    error(err, res);
  }
});

app.post("/api/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return error(err, res);
    res.json("Done! ");
  });
});

app.post("/api/set-follower", async (req, res) => {
  const follower = req.session.username;
  const followed = req.body.followed;

  try {
    await add_follower(follower, followed);
    res.json("Done");
  } catch (err) {
    error(err, res);
  }
});

app.post("/api/remove-follower", async (req, res) => {
  const follower = req.session.username;
  const followed = req.body.followed;

  try {
    await remove_follower(follower, followed);
    res.json("Done!");
  } catch (err) {
    error(err, res);
  }
});

app.post("/api/set-count", async (req, res) => {
  let current_count = req.body.count;
  let username = req.session.username;

  try {
    await write_to_data_base(username, current_count);
    res.json("Success");
  } catch (err) {
    error(err, res);
  }
});

app.post("/api/login/post", async (req, res) => {
  let create_account = req.query.create_account === "true";
  let password = rövarencrypt(req.body.password);
  let username = req.body.username;

  if (!username || !password) {
    return res.json({ message: "Missing username or password" });
  }
  if (!password) {
    res.json({ success: false, message: "You need to insert a password! " });
  } else if (!create_account) {
    let result = await check_login(username, password);
    if (result) {
      req.session.username = username;
      res.json({ success: true, message: "you are logged in!" });
    } else
      res.json({
        success: false,
        message: "Incorrect username or password! ",
      });
  } else {
    let created_account = await insert_login(username, password);
    if (created_account) {
      res.json({ success: true, message: "The account has been created! " });
    } else {
      res.json({ success: false, message: "The account already exists! " });
    }
  }
});

function error(err, res) {
  return res.status(500).json({ error: err });
}

main();

module.exports = { pool };
