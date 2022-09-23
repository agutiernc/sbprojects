const request = require('supertest')
const app = require('../app')
const db = require('../db')

let testCompany;

beforeEach(async () => {
  const result = await db.query(`
    INSERT INTO companies (code, name, description)
    VALUES ('intel', 'Intel', 'Maker of microprocessors')
    RETURNING code, name, description
  `)

  testCompany = result.rows[0]
})


afterEach(async () => {
  // empties out companies table each time a test finishes
  await db.query('DELETE FROM companies')
})


afterAll(async () => {
  // close db connection
  await db.end()
})


describe('GET /companies', () => {
  test('Get all companies', async () => {
    const res = await request(app).get('/companies')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ companies: [testCompany] })
  })
})


describe('GET /companies/:code', () => {
  test('Gets a single company', async () => {
    const res = await request(app).get(`/companies/${testCompany.code}`)

    testCompany.invoices = [] // Add invoices to company object

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ company: testCompany })
  })


  test('Respond with 404 for invalid code', async () => {
    const res = await request(app).get('/companies/xyz')

    expect(res.statusCode).toBe(404)
  })
})


describe('POST /companies', () => {
  test('Create a new company', async () => {
    const res = await request(app)
                        .post('/companies')
                        .send({
                          name: 'Dell',
                          description: 'Maker of personal computers'
                        })
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({
      company: {
        code: 'dell',
        name: 'Dell',
        description: 'Maker of personal computers'
      }
    })
  })
})


describe('PUT /companies/:code', () => {
  test('Updates a single company', async () => {
    const res = await request(app)
                        .put(`/companies/${testCompany.code}`)
                        .send({ 
                          name: 'Intel Inc.',
                          description: 'Maker of semi-conductors'
                        })
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      company: {
        code: 'intel',
        name: 'Intel Inc.',
        description: 'Maker of semi-conductors'
      }
    })
  })


  test('Respond with 404 for invalid code', async () => {
    const res = await request(app)
                        .put(`/companies/atari`)
                        .send({ 
                          name: 'Atari',
                          description: 'Maker of video games'
                        })
    
    expect(res.statusCode).toBe(404)
  })
})

describe('DELETE /companies/:code', () => {
  test('Deletes a single company', async () => {
    const res = await request(app).delete(`/companies/${testCompany.code}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ msg: 'DELETED!'})
  })
})