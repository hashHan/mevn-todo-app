var env = process.env.NODE_ENV || 'development';

console.log('env ****', env);

var config = require('./config.json');
var envConfig = config[env];

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
});


  // var env = process.env.NODE_ENV || 'development';
  
  // var db = {
  //   dev : 'mongodb://localhost:27017/TodoApp',
  //   test : 'mongodb://localhost:27017/TodoAppTest',
  //   mlab : 'mongodb://<user>:<pass>@ds155674.mlab.com:55674/todoapp-nodejs'
  // };
  // if(process.env.PORT){
  //   process.env.MONGODB_URI = db.mlab;
  // } else {
  //   process.env.PORT = 3000;
  //   if(env === 'development'){
  //     process.env.MONGODB_URI = db.dev;
  //   } else if (env === 'test'){
  //     process.env.MONGODB_URI = db.test;
  //     }
  // }