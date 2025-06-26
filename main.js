
var http = require("http");
var express = require("express");
var sqlite3 = require("sqlite3");
var path = require("path");

var app = express();

const DB_PATH = path.join(__dirname, "my_data.db");
const WEB_PATH = path.join(__dirname, "web");
const PORT = 4747;

var server = http.createServer(app);

app.use(express.static(WEB_PATH)); //Server my static files (HTML, CSS);

function main(){

  server.listen(PORT);
}

main();