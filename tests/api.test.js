const app = require('../app')
const mongoose = require('mongoose')

const supertest = require('supertest')

const api = supertest(app)

test('test of root api', async () => {
  const response = await api.get('/')
  // console.log(response)

  expect(response.statusCode).toBe(200)
  expect(response.text).toBe('Hello World!')
})

afterAll(() => {
  mongoose.connection.close()
})
