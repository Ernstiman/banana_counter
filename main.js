var http = require("http");
var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");
var fs = require("fs");
const { emitWarning } = require("process");
const { error } = require("console");
const session = require('express-session');

var app = express();

const DB_PATH = path.join(__dirname, "my_data.db");
const WEB_PATH = path.join(__dirname, "web");
const SQL_PATH = path.join(__dirname, "my_sql.sql");
const PORT = 4747;

var data_base = new sqlite3.Database(DB_PATH);

var server = http.createServer(app);
sql_init = fs.readFileSync(SQL_PATH, "utf-8");
data_base.exec(sql_init);

app.use(express.json());
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}));

app.post("/api/post", (req, res) => {
  var current_count = req.body.count;
  var username = req.body.username;
  write_to_data_base(username, current_count);
  res.send("job done");
});

app.get("/api/me", (req, res) => {
  console.log(req.session.username)
  if(req.session.username){
    res.json(req.session.username)};
})

app.get("/api/count", (req, res) => {
  let username = req.query.username;
  data_base.get(
    `
      SELECT count FROM Banana_data WHERE username = ?
    `,
    username,
    (err, row) => {
      data_base.get(
        `
        SELECT SUM(count) AS total FROM Banana_data
        `,
        (err, child_row) => {
          if (err) console.log(err);
          else {
            console.log(child_row.total);
            if (!row) {
              data_base.run(
                `
            INSERT INTO Banana_data (username, count) VALUES (?, 0)
            `,
                username,
                (err) => {
                  if (err) {
                    console.log(err);
                  } else
                    res.send({
                      count: 0,
                      total_count: child_row ? child_row.total : 0,
                    });
                }
              );
            } else {
              res.send({
                count: row.count,
                total_count: child_row ? child_row.total : 0,
              });
            }
          }
        }
      );
    }
  );
});

app.post("/api/login/post", (req, res) => {
  let con = req.query.login === "true";
  let password = req.body.password;
  let username = req.body.username;
  if (con) {
    check_login(username, password, (exists) => {
      console.log(exists);
      if (exists){
          req.session.username = username;
         res.json({ success: true });
          
        }
    
      else res.json({ success: false });
    });
  } else {
    insert_login(username, password, (success) => {
      res.json({ success });
    });
  }
});

app.use(express.static(WEB_PATH)); //Server my static files (HTML, CSS);

function main() {
  server.listen(PORT);
}

function check_login(username, password, callback) {
  data_base.get(
    `
      SELECT * FROM Banana_data WHERE username = ? AND psw = ?
    `,
    [username, password],
    (err, row) => {
      if (err) {
        console.log(err);
        return;
      }
      if (row) {
        callback(true);
      } else {
        callback(false);
      }
    }
  );
}

function insert_login(username, password, callback) {
  check_login(username, password, (exists) => {
    if (!exists) {
      data_base.run(
        `
          INSERT INTO Banana_data (username, psw) VALUES (?, ?)
        `,
        [username, password],
        (err) => {
          if (err) {
            console.log(err);
            callback(false);
          } else callback(true);
        }
      );
    }
    else callback(false)
  });
}

function write_to_data_base(username, count) {
  data_base.run(
    `UPDATE Banana_data SET count = ? WHERE username = ?`,
    [count, username],
    (err) => {
      if (err) console.log(err);
    }
  );
}

main();
