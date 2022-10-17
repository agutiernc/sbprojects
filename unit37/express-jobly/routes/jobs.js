"use strict";

/** Routes for jobs */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { requireAdmin } = require("../middleware/auth");

const Job = require('../models/job')
const jobNewSchema = require('../schemas/jobNew.json')
const jobSearchSchema = require('../schemas/jobSearch.json')

const router = new express.Router()


/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, companyHandle }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: Admin only
 */

router.post('/', requireAdmin, async function (req, res, next) {
  try {
    const validJob = jsonschema.validate(req.body, jobNewSchema)

    if (!validJob.valid) {
      const errs = validJob.errors.map(e => e.stack);

      throw new BadRequestError(errs);
    }

    const job = await Job.create(req.body)

    return res.status(201).json({ job })
  } catch (err) {
    return next(err)
  }
})

/** GET /  =>
 *   { jobs: [ { id, title, salary, equity, companyHandle }, ...] }
 *
 *
 * Authorization required: none
 */


router.get('/', async function (req, res, next) {
  const query = req.query

  try {
    const validQueries = jsonschema.validate(req.query, jobSearchSchema)

    if (!validQueries.valid) {
      const listOfErrors = validQueries.errors.map(e => e.stack)
      
      throw new BadRequestError(listOfErrors)
    }

    const jobs = await Job.findAll(query)

    return res.json({ jobs })
  } catch (err) {
    return next(err)
  }
})


/** GET /[id]  =>  { job }
 *
 *  Job is { id, title, salary, equity, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: none
 */

router.get('/:id', async function (req, res, next) {
  try {
    const job = await Job.get(req.params.id)

    return res.json ({ job })
  } catch (err) {
    return next(err)
  }
})


module.exports = router;