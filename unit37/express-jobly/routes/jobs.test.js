"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);

afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe('POST /jobs', function () {
  test('Admin can post', async function () {
    const res = await request(app)
          .post('/jobs')
          .send({
            companyHandle: "c1",
            title: "Designer",
            salary: 70000,
            equity: "0"
          })
          .set('authorization', `Bearer ${adminToken}`)
    
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({
      job: {
        id: expect.any(Number),
        companyHandle: "c1",
        title: "Designer",
        salary: 70000,
        equity: "0"
      }
    })
  })

  test('Unauthorized users can not post', async function () {
    const res = await request(app)
          .post('/jobs')
          .send({
            companyHandle: "c1",
            title: "Designer",
            salary: 70000,
            equity: "0"
          })
          .set('authorization', `Bearer ${u1Token}`)
    
    expect(res.statusCode).toEqual(401)
  })

  test('bad request with missing data', async function () {
    const res = await request(app)
          .post('/jobs')
          .send({ salary: 70000, equity: "0"})
          .set('authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(400)
  })

  test('bad request with invalid data', async function () {
    const res = await request(app)
          .post('/jobs')
          .send({
            companyHandle: "c1",
            title: "Designer",
            salary: "70000", // should not be a string
            equity: 0 // should be a string
          })
          .set('authorization', `Bearer ${adminToken}`)
    
    expect(res.statusCode).toEqual(400)
  })
}) // end


/************************************** GET /companies */

describe('GET /jobs', function () {
  test('anyone can get jobs', async function () {
    const res = await request(app).get('/jobs')

    expect(res.statusCode).toEqual(200)
  })

  test('Filter for title', async function () {
    const res = await request(app).get('/jobs').query({ title: 'J1' })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      jobs: [
        {
          id: testJobIds[0],
          title: 'J1',
          salary: 1,
          equity: '0.1',
          companyHandle: 'c1',
          companyName: 'C1'
        }
      ]
    })
  })

  test('Using multiple filters', async function () {
    const res = await request(app)
          .get('/jobs')
          .query({ title: 'J1', hasEquity: true })
    
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      jobs: [
        {
          id: testJobIds[0],
          title: 'J1',
          salary: 1,
          equity: '0.1',
          companyHandle: 'c1',
          companyName: 'C1'
        }
      ]
    })
  })
}) // end


/************************************** GET /jobs/:id */

describe('GET /jobs/:id', function () {
  test('anyone can get a job', async function () {
    const res = await request(app).get(`/jobs/${testJobIds[0]}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      job: {
        id: testJobIds[0],
        title: 'J1',
        salary: 1,
        equity: '0.1',
        company: {
          handle: 'c1',
          name: 'C1',
          description: 'Desc1',
          numEmployees: 1,
          logoUrl: 'http://c1.img'
        }
      }
    })
  })

  test('If job not found', async function () {
    const res = await request(app).get('/jobs/0')

    expect(res.statusCode).toEqual(404)
  })
}) //end


/************************************** PATCH /jobs/:id */

describe('PATCH /jobs/:id', function () {
  test('Admin can update job', async function () {
    const res = await request(app)
          .patch(`/jobs/${testJobIds[0]}`)
          .send({ title: 'J1', salary: 2 })
          .set('authorization', `Bearer ${adminToken}`)
    console.log(res.body)
    expect(res.statusCode).toEqual(200)
    // expect(res.body).toEqual({
    //   job: {
    //     id: testJobIds[0],
    //     title: 'J1',
    //     salary: 2,
    //     equity: '0.1',
    //     companyHandle: 'c1'
    //   }
    // })
  })

  test('Unauthorized users can not update', async function () {
    const res = await request(app)
          .patch(`/jobs/${testJobIds[0]}`)
          .send({ title: 'J1', salary: 3 })
          .set('authorization', `Bearer ${u1Token}`)
    
    expect(res.statusCode).toEqual(401)
  })

  test('If job not found', async function () {
    const res = await request(app)
          .patch(`/jobs/0`)
          .send({ title: 'J1', salary: 5 })
          .set('authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(404)
  })

  test('bad request with invalid data', async function () {
    const res = await request(app)
          .patch(`/jobs/${testJobIds[0]}`)
          .send({
            title: "J1",
            salary: "2", // should not be a string
          })
          .set('authorization', `Bearer ${adminToken}`)
    
    expect(res.statusCode).toEqual(400)
  })
}) // end


/************************************** DELETE /companies/:handle */

describe('DELETE /jobs/:id', function () {
  test('Only admin can delete', async function () {
    const res = await request(app)
          .delete(`/jobs/${testJobIds[0]}`)
          .set('authorization', `Bearer ${adminToken}`)
    
    expect(res.body).toEqual({ deleted: testJobIds[0] })
  })

  test('Unauthorized user can not delete', async function () {
    const res = await request(app)
          .delete(`/jobs/${testJobIds[0]}`)
          .set('authorization', `Bearer ${u1Token}`)
    
    expect(res.statusCode).toEqual(401)
  })

  test('Anonymous user can not delete', async function () {
    const res = await request(app).delete(`/jobs/${testJobIds[0]}`)
    
    expect(res.statusCode).toEqual(401)
  })

  test('If job not found', async function () {
    const res = await request(app)
          .delete(`/jobs/0`)
          .send({ title: 'J1', salary: 5 })
          .set('authorization', `Bearer ${adminToken}`)

    expect(res.statusCode).toEqual(404)
  })
})