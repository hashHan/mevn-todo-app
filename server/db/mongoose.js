const mongoose = require('mongoose');

const REMOTE_MONGO = 'mongodb://todoapp:todoapp@ds223019.mlab.com:23019/todoapp';
const LOCAL_MONGO = 'mongodb://localhost:27017/TodoApp';
const MONGO_URI = process.env.PORT ? REMOTE_MONGO : LOCAL_MONGO;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
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