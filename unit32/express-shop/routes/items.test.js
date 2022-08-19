const request = require('supertest')
const app = require('../app')
let items = require('../fakeDb')

let snickers = { name: "snickers", price: 0.80 }

beforeEach(function() {
  items.push(snickers)
})

afterEach(function() {
  items.length = 0
})

// GET Requests tests

describe('GET /items', function() {
  test('Get a list of items', async function() {
    const res = await request(app).get(`/items`)

    console.log('RES => ', res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [snickers] })
  })
})

describe('GET /items/:name', function() {
  test('Get a single item by name', async function() {
    const res = await request(app).get(`/items/${snickers.name}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ item: snickers })
  })

  test('Response is 404 if item not found', async function() {
    const res = await request(app).get('/items/pepsi')

    expect(res.statusCode).toBe(404)
  })
})

// POST request tests

describe('POST /items', function() {
  test('Create a new item', async function() {
    const res = await request(app)
      .post('/items')
      .send({ name: "cheerios", price: 5.25 })

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({ added: { name: "cheerios", price: 5.25 }})
  })

  test('If item is missing, respond with 400', async function() {
    const res = await request(app).post('/items').send({})

    expect(res.statusCode).toBe(400)
  })
})


// PATCH request tests

describe('PATCH /items/:name', function() {
  test('Update a single item', async function() {
    const res = await request(app)
      .patch(`/items/${snickers.name}`)
      .send({ name: 'snickers', price: 1.00 })
    
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual( { item: { name: 'snickers', price: 1.00 } })
  })

  test('Respond with 404 if name is invalid', async function() {
    const res = await request(app).patch(`/items/sprite`)

    expect(res.statusCode).toBe(404)
  })
})


// DELETE request tests

describe('DELETE /items/:name', function() {
  test('Delete a single item', async function() {
    const res = await request(app).delete(`/items/${snickers.name}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ message: 'Item deleted' })
  })

  test('Delete and respond with 404 for invalid item', async function() {
    const res = await request(app).delete('/items/sprite')

    expect(res.statusCode).toBe(404)
  })
})