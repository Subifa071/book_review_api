const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/User')

const api = supertest(app)

// test setup-> db clean before running
beforeAll(async () => {
  await User.deleteMany({})
})

test('user can be registered ', async () => {
  await api
    .post('/users/register')
    .send({
      username: 'subifa',
      password: 'subifa',
      email: 'subifa123@gmail.com',
      fullName: 'subifa doe',
    })
    .expect(201)
})

test('duplicate username can not be registered', async () => {
  res = await api
    .post('/users/register')
    .send({
      username: 'subifa',
      password: 'subifa',
      email: 'subifa123@gmail.com',
      fullName: 'subifa doe',
    })
    .expect(400)
  console.log(res.body)
  expect(res.body.error).toBeDefined()
  expect(res.body.error).toMatch(/already registered/)
})
test('missing email can not be registered', async () => {
  res = await api
    .post('/users/register')
    .send({
      username: 'jane1',
      password: 'jane',
      fullName: 'jane doe1',
    })
    .expect(400)

  expect(res.body.error).toBeDefined()
  expect(res.body.error).toMatch(/validation failed/)
})

test('user can login with valid credentials', async () => {
  await api
    .post('/users/login')
    .send({
      username: 'subifa',
      password: 'subifa',
    })
    .expect(200)
    .then((res) => {
      expect(res.body.username).toBe('subifa')
      expect(res.body.token).toBeDefined()
    })
})
// Teardown
afterAll(async () => {
  await mongoose.connection.close()
})
