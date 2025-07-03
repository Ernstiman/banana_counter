var http = require("http");
var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");
var fs = require("fs");
var util = require("util");
const session = require("express-session");

var app = express();

const DB_PATH = path.join(__dirname, "my_data.db");
const WEB_PATH = path.join(__dirname, "web");
const SQL_PATH = path.join(__dirname, "my_sql.sql");
const PORT = 4747;

var SQL3 = new sqlite3.Database(DB_PATH);
var data_base = {
  run: util.promisify(SQL3.run.bind(SQL3)),
  get: util.promisify(SQL3.get.bind(SQL3)),
  exec: util.promisify(SQL3.exec.bind(SQL3)),
};

var server = http.createServer(app);
sql_init = fs.readFileSync(SQL_PATH, "utf-8");

app.use(express.json());
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/api/post", async (req, res) => {
  let current_count = req.body.count;
  let username = req.body.username;
  await write_to_data_base(username, current_count);
  res.send("success!");
});

app.get("/main.html", (req, res, next) => {
  console.log(req.session.username);
  if (!req.session.username) {
    return res.redirect("/index.html");
  }
  next();
});

app.get("/api/me", (req, res) => {
  res.json({ username: req.session.username });
});

app.get("/api/count", async (req, res) => {
  let username = req.session.username;
  let result = await data_base.get(
    `
      SELECT count FROM Banana_data WHERE username = ?
    `,
    username
  );
  let sum_result = await data_base.get(
    `
        SELECT SUM(count) AS total FROM Banana_data
        `
  );
  res.send({
    count: result.count,
    total_count: sum_result.total,
  });
});

app.post("/api/login/post", async (req, res) => {
  let con = req.query.login === "true";
  let password = req.body.password;
  let username = req.body.username;
  if (con) {
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
    let created = await insert_login(username, password);
    console.log(created);
    if (created) {
      res.json({ success: true, message: "The account has been created! " });
    } else {
      res.json({ success: false, message: "The account already exists! " });
    }
  }
});

app.use(express.static(WEB_PATH)); //Server my static files (HTML, CSS);

async function main() {
  await data_base.exec(sql_init);
  server.listen(PORT);
}

async function check_login(username, password = undefined) {
  let result;
  if (password) {
    result = await data_base.get(
      `
        SELECT * FROM Banana_data WHERE username = ? AND psw = ?
      `,
      [username, password]
    );
  } else {
    result = await data_base.get(
      `
        SELECT * FROM Banana_data WHERE username = ?
      `,
      [username]
    );
  }
  if (result) {
    return true;
  }
  return false;
}

async function insert_login(username, password) {
  let exists = await check_login(username);
  if (!exists) {
    await data_base.run(
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
  await data_base.run(`UPDATE Banana_data SET count = ? WHERE username = ?`, [
    count,
    username,
  ]);
}

main();
