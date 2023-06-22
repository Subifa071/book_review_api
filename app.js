require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const books_routes = require('./routes/books_routes')
const user_routes = require('./routes/user_routes')
const { verifyUser } = require('./middlewares/auth')
const upload = require('./middlewares/upload')

const MONGODB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI

console.log(MONGODB_URI)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connect to mongodb server'))
  .catch((err) => console.log(err))

const app = express()

app.use(express.json())
app.use(express.static('public'))
// there should at least be 2 parameters such as req, res
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', user_routes)
// app.use('/books', books_routes)
app.use('/books', verifyUser, books_routes)

app.post('/images', upload.single('photo'), (req, res) => {
  res.json(req.file)
})

// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  if (err.name === 'CastError') {
    res.status(400)
  } else if (err.name == 'ValidationError') {
    res.status(400)
  }
  res.json({ error: err.message })
})

// Unknown Path handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'path not found' })
})

// app.listen(3001, () => {
//   console.log('server is running on port 3001')
// })
module.exports = app
