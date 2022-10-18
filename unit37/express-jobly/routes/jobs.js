"use strict";

/** Routes for jobs */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { requireAdmin } = require("../middleware/auth");

const Job = require('../models/job')
const jobNewSchema = require('../schemas/jobNew.json')
const jobSearchSchema = require('../schemas/jobSearch.json')
const jobUpdateSchema = require ('../schemas/jobUpdate.json')

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
  query.hasEquity = query.hasEquity === 'true'

  // convert minSalary to Number
  if (query.minSalary !== undefined) {
    query.minSalary = +query.minSalary
  }

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


/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * data can be: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: Admin only
 */

router.patch('/:id', requireAdmin, async function (req, res, next) {
  try {
    const jobValidator = jsonschema.validate(req.body, jobUpdateSchema)

    if (!jobValidator.valid) {
      const errs = jobValidator.errors.map(e => e.stack);

      throw new BadRequestError(errs);
    }

    const job = await Job.update(req.params.id, req.body)

    return res.json({ job })
  } catch (err) {
    return next(err)
  }
})


/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: Adin only
 */

router.delete('/:id', requireAdmin, async function (req, res, next) {
  try {
    await Job.remove(req.params.id)

    return res.json({ deleted: +req.params.id })
  } catch (err) {
    return next(err)
  }
})

module.exports = router;