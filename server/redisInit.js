const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

///Created the initialization on a seperate file so that we would not get any 
// circular dependencies between server and database

module.exports = {
    client
};



