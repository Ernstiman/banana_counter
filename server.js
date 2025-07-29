require("dotenv").config();

const {
  pool
} = require("./db.js");

var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cors = require("cors");

const authRoutes = require("./routes/auth.js");
const bananasRoutes = require("./routes/bananas.js")
const followersRoutes = require("./routes/followers.js");
const friendRequestsRoutes = require("./routes/friendRequests.js");
const bananaHistoryRoutes = require("./routes/bananaHistory.js");
const usersRoutes = require("./routes/users.js");
const pushNotificationRoutes = require("./routes/pushNotifications.js")
const session = require("express-session");

var app = express();

const BANANA_DATA_SQL_PATH = path.join(__dirname, "./sql/Banana_data.sql");
const FOLLOWERS_SQL_PATH = path.join(__dirname, "./sql/Followers.sql");
const BANANA_HISTORY_SQL_PATH = path.join(__dirname, "./sql/Banana_history.sql");
const FRIEND_REQUESTS_SQL_PATH = path.join(__dirname, "./sql/Friend_requests.sql")
const PASSWORD_RESETS_SQL_PATH = path.join(__dirname, "./sql/Password_resets.sql");
const NOTIFICATION_SUBSCRIPTIONS_SQL_PATH = path.join(__dirname, "./sql/Notification_subscriptions.sql");
const PORT = 4747;

var server = http.createServer(app);
banana_data_init = fs.readFileSync(BANANA_DATA_SQL_PATH, "utf-8");
followers_init = fs.readFileSync(FOLLOWERS_SQL_PATH, "utf-8");
banana_history_init = fs.readFileSync(BANANA_HISTORY_SQL_PATH, "utf-8");
friend_requests_init = fs.readFileSync(FRIEND_REQUESTS_SQL_PATH, "utf-8");
password_resets_init = fs.readFileSync(PASSWORD_RESETS_SQL_PATH, "utf-8");
notification_subscriptions_init = fs.readFileSync(NOTIFICATION_SUBSCRIPTIONS_SQL_PATH, "utf-8");

async function main() {
  await pool.query(banana_data_init);

  await pool.query(followers_init);

  await pool.query(banana_history_init);

  await pool.query(friend_requests_init);

  await pool.query(password_resets_init);

  await pool.query(notification_subscriptions_init);

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

app.use("/api/auth", authRoutes);
app.use("/api/bananas", bananasRoutes);
app.use("/api/followers", followersRoutes);
app.use("/api/friend-requests", friendRequestsRoutes);
app.use("/api/banana-history", bananaHistoryRoutes);
app.use("/api/users", usersRoutes); 
app.use("/api/push-notifications", pushNotificationRoutes)

main();

module.exports = { pool };
