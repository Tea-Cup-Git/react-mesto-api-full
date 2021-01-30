const mongoose = require('mongoose');

const reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return reg.test(v);
      },
      message: (props) => `${props.value} ссылка невалидна!`
    }
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    default: []
  }],
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);