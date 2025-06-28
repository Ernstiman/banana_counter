
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
const SQL_PATH = path.join(__dirname, "my_sql.sql")
const PORT = 4747;

var data_base = new sqlite3.Database(DB_PATH);

var server = http.createServer(app);
sql_init = fs.readFileSync(SQL_PATH, "utf-8");
data_base.exec(sql_init);

app.use(express.json());

app.post("/",(req, res) => {
    var current_count = req.body.count;
    current_count = Number(current_count);
    write_to_data_base(current_count);
    res.send("job done")
})

app.get("/count", (req, res) => {
  data_base.get(
    `
      SELECT count FROM Banana_data ORDER BY id DESC LIMIT 1
    `, (err, row) => {
      if (err) console.log(err);
      else {
        res.send({ count: row ? row.count : 0 });
        }
    }
  )
})

app.use(express.static(WEB_PATH)); //Server my static files (HTML, CSS);



function main(){

  server.listen(PORT);
}

function write_to_data_base(count){
     data_base.run(
    `INSERT INTO Banana_data (count) VALUES (?)`, count, (err) => {
      if(err) console.log(err);
    })
}

main();