const request = require('supertest')
const app = require('../app')
const db = require('../db')

let testInvoice
let testCompany

beforeEach(async () => {
  const companyResult = await db.query(`
    INSERT INTO companies (code, name, description)
    VALUES ('microsoft', 'Microsoft', 'Maker of Windows')
    RETURNING code, name, description
  `)

  const result = await db.query(`
    INSERT INTO invoices (comp_code, amt, paid)
    VALUES ('microsoft', 250, false)
    RETURNING id, comp_code, amt, paid, add_date, paid_date
  `)

  testInvoice = result.rows[0]
  testCompany = companyResult.rows[0]
})


afterEach(async () => {
  // deletes invoices and companies table each time a test finishes
  await db.query('DELETE FROM invoices')
  await db.query('DELETE FROM companies')
})


afterAll(async () => {
  // close db connection
  await db.end()
})


describe('GET /invoices', () => {
  test('Get all invoices', async () => {
    const res = await request(app).get('/invoices')
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({  inovices: [
      {
        id: testInvoice.id,
        comp_code: testInvoice.comp_code,
        amt: testInvoice.amt,
        paid: testInvoice.paid,
        add_date: testInvoice.add_date.toJSON(),
        paid_date: testInvoice.paid_date
      }
    ]})
  })
})


describe('GET /invoices/:id', () => {
  test('Gets a single company', async () => {
    const res = await request(app).get(`/invoices/${testInvoice.id}`)

    const invoice = {
      id: testInvoice.id,
      company: {
        code: testCompany.code,
        name: testCompany.name,
        description: testCompany.description,
      },
      amt: testInvoice.amt,
      paid: testInvoice.paid,
      add_date: testInvoice.add_date.toJSON(),
      paid_date: testInvoice.paid_date
    }

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ invoices: invoice })
  })


  test('Respond with 404 for invalid id', async () => {
    const res = await request(app).get('/invoices/0')

    expect(res.statusCode).toBe(404)
  })
})


describe('DELETE /invoices/:id', () => {
  test('Deletes a single invoice', async () => {
    const res = await request(app).delete(`/invoices/${testInvoice.id}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ msg: 'DELETED!'})
  })
})


describe('PUT /invoices/:id', () => {
  test('Update a single invoice', async () => {
    const res = await request(app)
                        .put(`/invoices/${testInvoice.id}`)
                        .send({ amt: 250 })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      invoice: {
        id: testInvoice.id,
        comp_code: testInvoice.comp_code,
        amt: testInvoice.amt,
        paid: true,
        add_date: testInvoice.add_date.toJSON(),
        paid_date: testInvoice.add_date.toJSON()
      }
    })
  })
})