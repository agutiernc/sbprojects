"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);

afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe('create', function () {
  const newJob = {
    title: 'TestJob',
    salary: 200,
    equity: '0.1',
    companyHandle: 'c1'
  }

  test('Create new job', async function () {
    const job = await Job.create(newJob)

    expect(job).toEqual({ ...newJob, id: expect.any(Number) })
  })
})


/************************************** findAll */

describe('findAll', function () {
  test('gets all jobs with no filters', async function () {
    const jobs = await Job.findAll()

    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: 'J1',
        salary: 1,
        equity: '0.1',
        companyHandle: 'c1',
        companyName: 'C1'
      },
      {
        id: expect.any(Number),
        title: 'J2',
        salary: 2,
        equity: '0.2',
        companyHandle: 'c1',
        companyName: 'C1'
      },
      {
        id: expect.any(Number),
        title: 'J3',
        salary: 3,
        equity: null,
        companyHandle: 'c1',
        companyName: 'C1'
      }
    ])
  })

  test('Filter: title', async function () {
    const jobs = await Job.findAll({ title: 'J1' })

    expect(jobs).toEqual([{
      id: expect.any(Number),
      title: 'J1',
      salary: 1,
      equity: '0.1',
      companyHandle: 'c1',
      companyName: 'C1'
    }])
  })

  test('Filter: minSalary', async function () {
    const jobs = await Job.findAll({ minSalary: 3 })
    
    expect(jobs).toEqual([{
      id: expect.any(Number),
      title: 'J3',
      salary: 3,
      equity: null,
      companyHandle: 'c1',
      companyName: 'C1'
    }])
  })

  test('Filter: hasEquity', async function () {
    const jobs = await Job.findAll({ hasEquity: true })

    expect(jobs).toEqual([{
      id: expect.any(Number),
      title: 'J1',
      salary: 1,
      equity: '0.1',
      companyHandle: 'c1',
      companyName: 'C1'
    },
    {
      id: expect.any(Number),
      title: 'J2',
      salary: 2,
      equity: '0.2',
      companyHandle: 'c1',
      companyName: 'C1'
    }])
  })

  test('Filters: title and hasEquity', async function () {
    const jobs = await Job.findAll({ title: 'J3', hasEquity: false })

    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: 'J3',
        salary: 3,
        equity: null,
        companyHandle: 'c1',
        companyName: 'C1'
      }
    ])
  })
}) // end


/************************************** get */

describe('get', function () {
  test('gets a job by id', async function () {
    const jobs = await Job.get(`${testJobIds[0]}`)

    expect(jobs).toEqual({
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
    })
  })

  test('Error if no job id found', async function () {
    try {
      await Job.get("0");

      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
})


/************************************** update */

describe('Update job', function () {
  const updateData = {
    title: 'New Job',
    salary: 1000,
    equity: '0.5'
  }

  test('Admin can update', async function () {
    const job = await Job.update(testJobIds[0], updateData)
    
    expect(job).toEqual({
      id: testJobIds[0],
      companyHandle: 'c1',
      ...updateData
    })
  })

  test('Error if no job id found', async function () {
    try {
      await Job.update(0, updateData);

      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })

  test('Error if no data passed', async function () {
    try {
      await Job.update(testJobIds[0], {});

      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })
})


/************************************** remove */

describe('remove job', function () {
  test('Deletes a job', async function () {
    await Job.remove(testJobIds[1])

    const res = await db.query(`
      SELECT id FROM jobs WHERE id = $1
    `, [testJobIds[1]])

    expect(res.rows.length).toEqual(0)
  })

  test('No job found', async function () {
    try {
      await Job.remove(0)

      fail()
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
})