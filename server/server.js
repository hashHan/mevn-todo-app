require('./config/config');

const path = require('path');//deployment
const publicPath = path.join(__dirname, '/../');//deployment. index.html // not ../dist

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

//cors with response header setting

//cors options
//var whitelist = ['localhost:3000','http://localhost:3000','http://localhost:8080', 'https://mysterious-woodland-17947.herokuapp.com/'];
var corsOptions = { // origin restriction makes deployment failed.
  // origin: function (origin, callback) {//for origin restriction
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  exposedHeaders: [//allow custom response header 
    'x-auth',
    'expiresIn'
  ]
};

//app.use(cors(corsOptions));
app.all('*', cors(corsOptions))
//app.use(cors());

app.use(express.static(publicPath));//deployment

app.use(bodyParser.json());

app.get('/', function (req, res) {// link home to front
  res.sendFile(path.join(__dirname+'index.html'));
}); 

app.post('/todos', authenticate, (req, res) => { //each user by authenticate
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id //individual user
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id //individual user
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
  .then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST
//users
//post
//signup
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).header('expiresin', 3600).send(user);
  }).catch((e) => {
    res.statusMessage = "check your login info";
    res.status(401).end();
  })
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).header('expiresin', 3600).send(user);
    });
  }).catch((e) => {
    res.statusMessage = "check your login info";
    res.status(401).end();
    //res.status(400).send(e);
    // res.status(400).send('check your login info');
  });
});

//get
//middleware
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

//delete //LOGOUT
//middleware

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
