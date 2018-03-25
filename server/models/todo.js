const mongoose = require('mongoose');

//schema
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: { //for specific user's page
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};
