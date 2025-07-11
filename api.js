var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var mysql = require("mysql2/promise")
var cors = require("cors")

const session = require("express-session");

var app = express();

const DB_PATH = path.join(__dirname, "my_data.db");
const WEB_PATH = path.join(__dirname, "web");
const SQL_PATH = path.join(__dirname, "my_sql.sql");
const PORT = 4747;
const dbConfig = {
  host: 'localhost',
  user: 'viktor',
  password: 'MY_sql_pass!123',
  database: 'my_data'
}
let data_base;
let pool;

var server = http.createServer(app);
sql_init = fs.readFileSync(SQL_PATH, "utf-8");

async function main() {

  pool = mysql.createPool(dbConfig);

  await pool.query(sql_init);

  server.listen(PORT);

}


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/api/set-count", async (req, res) => {
  let current_count = req.body.count;
  let username = req.session.username;
  await write_to_data_base(username, current_count);
  res.send("success!");
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
  console.log(username)
  let [result] = await pool.query(
    `
      SELECT count FROM Banana_data WHERE username = ?
    `,
    [username]
  );
  let [sum_result] = await pool.query(
    `
        SELECT SUM(count) AS total FROM Banana_data
        `
  );
  res.send({
    count: result[0].count || 0,
    total_count: sum_result[0].total || 0,
  });
});

app.post("/api/login/post", async (req, res) => {
  let create_account = req.query.create_account === "true";
  console.log(create_account)
  let password = rövarencrypt(req.body.password);
  let username = req.body.username;
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
    let created = await insert_login(username, password);
    if (created) {
      res.json({ success: true, message: "The account has been created! " });
    } else {
      res.json({ success: false, message: "The account already exists! " });
    }
  }
});


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

function rövarencrypt(pass) {
  let kons = [
    "q",
    "w",
    "r",
    "t",
    "p",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];
  let new_pass = "";
  let i = 0;
  for (let letter of pass) {
    letter = String(letter);
    if (kons.includes(letter.toUpperCase()) || kons.includes(letter)) {
      new_pass += letter + "o" + letter;
      continue;
    }
    new_pass += letter;
    i++;
  }
  return new_pass;
}

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

main();
