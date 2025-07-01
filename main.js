var http = require("http");
var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");
var fs = require("fs");
const { emitWarning } = require("process");
const { error } = require("console");

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

app.post("/post", (req, res) => {
  var current_count = req.body.count;
  var player_id = req.body.id;
  current_count = Number(current_count);
  write_to_data_base(player_id);
  res.send("job done");
});

app.get("/count", (req, res) => {
  let id = Number(req.query.id);
  data_base.get(
    `
      SELECT count FROM Banana_data WHERE id = ?
    `,
    id,
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
              console.log("hej");
              data_base.run(
                `
            INSERT INTO Banana_data (id, count) VALUES (?, 0)
            `,
                id,
                (err) => {
                  if (err) {
                    console.log(err);
                  } else
                    res.send({
                      count: 0,
                      total_count: child_row ? child_row.total : _0,
                    });
                }
              );
            } else {
              res.send({
                count: row.count,
                total_count: child_row ? child_row.total : _0,
              });
            }
          }
        }
      );
    }
  );
});

app.use(express.static(WEB_PATH)); //Server my static files (HTML, CSS);

function main() {
  server.listen(PORT);
}

function write_to_data_base(id) {
  data_base.run(
    `UPDATE Banana_data SET count = count + 1 WHERE id = ?`,
    Number(id),
    (err) => {
      if (err) console.log(err);
    }
  );
}

main();
