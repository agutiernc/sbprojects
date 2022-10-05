process.env.NODE_ENV = "test"

const request = require('supertest')
const app = require('../app')
const db = require('../db')

let bookISBN

beforeEach(async () => {
  const result = await db.query(
    `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES(
      '123456778', 'https://amazon.com/book1', 'Bob Smith',
      'English', 250, 'Penguin Books', 'A Book I Wrote', 2022)
    RETURNING isbn`)

    bookISBN = result.rows[0].isbn
})


describe('/GET /books', function () {
  test('Get all books', async function () {
    const res = await request(app).get('/books')

    expect(res.statusCode).toBe(200)
    expect(res.body.books).toHaveLength(1)
    expect(res.body.books[0]).toHaveProperty("isbn")
  })
})


describe('/GET /books/:isbn', function () {
  test('Get a single book', async function () {
    const res = await request(app).get('/books/123456778')
    
    expect(res.statusCode).toBe(200)
    expect(res.body.book).toHaveProperty("author")
  })
})


describe('POST /books', function () {
  test('Create a new book', async function () {
    const newBook = {
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017
    }

    const res = await request(app).post('/books').send(newBook)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({ book: newBook })
  })

  test('Validation error for missing info', async function () {
    const res = await request(app).post('/books').send({ isbn: "213349084" })

    expect(res.statusCode).toBe(400)
  })
})


describe('PUT /books/:isbn', function () {
  const updateBook = {
    amazon_url: "https://amazon.com/book1",
    author: "Bob Smith",
    language: "english",
    pages: 350,
    publisher: "Penguin Books",
    title: "A Book I Wrote Last Summer",
    year: 2022
  }

  test('Update a book property', async function () {
    const res = await request(app).put(`/books/${bookISBN}`).send(updateBook)

    expect(res.statusCode).toBe(200)
    expect(res.body.book).toHaveProperty("pages")
    expect(res.body.book.title).toBe("A Book I Wrote Last Summer")
  })

  test('Invalid request if book isbn is not found. 404 error', async function () {
    const res = await request(app).put('/books/2345436467').send(updateBook)

    expect(res.statusCode).toBe(404)
  })

  test('Error if property is added to Book object', async function () {
    const badBook = {
      amazon_url: "https://amazon.com/book1",
      author: "Bob Smith",
      language: "english",
      pages: 350,
      publisher: "Penguin Books",
      title: "A Book I Wrote Last Summer",
      year: 2022,
      invalidField: "Expect an error"
    }

    const res = await request(app).put(`/books/${bookISBN}`).send(badBook)

    expect(res.statusCode).toBe(400)
  })
})


describe('DELETE /books/:isbn', function () {
  test('DELETE a book', async function () {
    const res = await request(app).delete(`/books/${bookISBN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ message: "Book deleted" })
  })
})


afterEach(async function () {
  await db.query('DELETE FROM BOOKS')
})


afterAll(async function () {
  await db.end()
})