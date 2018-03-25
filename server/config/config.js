var env = process.env.NODE_ENV || 'development';

console.log('env ****', env);

//SET MONGODB_URI ON HEROKU CLI FOR PRODUCTION 'heroku config:set MONGODB_URI=<your-mlab-uri>'
if (env === 'development' || env === 'test') {
  var config = require('./config.json'); // do not require this on production mode because it doesn't exist on productioin mode (.gitignore)
  var envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
