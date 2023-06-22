const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: [10, 'review should be long'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})
//schema define
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    //necessary
    required: true,
    minLength: [10, 'review should be longer than 10 characters'],
  },
  author: {
    type: String,
    //value supply then replace the default value Anonymous
    default: 'Anonymous',
  },
  reviews: [reviewSchema],
})
module.exports = mongoose.model('Book', bookSchema)
