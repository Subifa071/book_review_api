// let token = null

// // setup
// beforeAll(async () => {
//   await User.deleteMany({})

//   await User.create({
//     username: 'testsubifa',
//     password: 'testsubifa',
//     email: 'testsubifa123@gmail.com',
//     fullName: 'testsubifa doe',
//   })
//   const res = await api.post('/users/login').send({
//     username: 'testsubifa',
//     password: 'testsubifa',
//   })
//   token = res.body.token
// })

// describe('books route test', () => {
//   test('unauthorized users can not get list of books', async () => {
//     await api.get('/books').expect(401)
//   })
//   test('registered user can add book', async () => {
//     await api
//       .post('/books')
//       .send({
//         title: 'test',
//         author: 'test',
//       })
//       .set('authorization', `bearer ${registeredUser.token}`)
//       .expect(201)
//   })
// })

// afterAll(async () => {
//   await mongoose.connection.close()
// })
const { default: mongoose } = require('mongoose')
const app = require('../app')

const supertest = require('supertest')
const User = require('../models/User')
const Book = require('../models/Book')

const api = supertest(app)

let token = ''

beforeAll(async () => {
  // Register a user

  // Login a user
  const res = await api.post('/users/login').send({
    username: 'testsubifa',
    password: 'testsubifa',
  })
  console.log(res.body)
  token = res.body.token
})

describe('Book Rout Test', () => {
  test('Add Book', async () => {
    await Book.deleteMany({})
    const newBook = {
      title: 'testBook',
      author: 'testAuthor',
    }
    const header = {
      Authorization: `Bearer ${token}`,
    }
    const res = await api.post('/books').set(header).send(newBook).expect(200)
    expect(res.body.title).toMatch('testBook')
  })
  test('Check authorization', async () => {
    const res = await api.get('/books').expect(401)
  })
  test('Get All Books', async () => {
    const header = {
      Authorization: `Bearer ${token}`,
    }
    const res = await api.get('/books').set(header).expect(200)
    expect(res.body.length).toBe(1)
  })
  test('Get Book By Id', async () => {})
  test('Update Book', async () => {})
  test('Delete Book', async () => {})
})
