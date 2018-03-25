const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

module.exports = {mongoose};