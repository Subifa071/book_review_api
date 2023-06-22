const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  fullName: {
    type: String,
    required: true,
  },
})
userSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
    delete returnedDocument.password
  },
})
module.exports = new mongoose.model('User', userSchema)
