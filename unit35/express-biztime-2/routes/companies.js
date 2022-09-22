// response w/JSON
// add middleware to parse JSON

const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const db = require('../db')
const slugify = require('slugify')

// get all companies
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM companies')

    return res.json({ companies: result.rows })
  } catch (err) {
    return next(err)
  }
})

// get specific company
router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params

    const compResult = await db.query(`SELECT * FROM companies WHERE code = $1`, [code])

    if (compResult.rows.length === 0) {
      throw new ExpressError(`Company ${code} does not exist`, 404)
    }

    const invoiceResult = await db.query(`
      SELECT id FROM invoices WHERE comp_code = $1
    `, [code])

    const idsArr = invoiceResult.rows.map(i => i.id) // get company's invoice IDs

    // Add invoice ids into company object
    compResult.rows[0].invoices = idsArr

    return res.json({ company: compResult.rows[0] })
  } catch (err) {
    return next(err)
  }
})

// add a new company
router.post('/', async (req, res, next) => {
  try {
    let { name, description } = req.body

    // auto-correct malformed company code
    let code = slugify(name, { 
      remove: /[*+~.()&`'"!?<>,:@=$%#^]/g,
      lower: true,
      strict: true })

    const results = await db.query(
      `INSERT INTO companies (code, name, description)
      VALUES ($1, $2, $3) 
      RETURNING code, name, description`, [code, name, description]
    )

    return res.status(201).json({ company: results.rows[0] })
  } catch (err) {
    return next(err)
  }
})

// update existing company
router.put('/:code', async (req, res, next) => {
  try {
    const { code } = req.params
    const { name, description } = req.body

    const result = await db.query(`
      UPDATE companies SET name=$1, description=$2 
      WHERE code=$3
      RETURNING code, name, description
    `, [name, description, code])

    if (result.rows.length === 0) {
      throw new ExpressError(`Company ${code} does not exist`, 404)
    }

    return res.send({ company: result.rows[0] })

  } catch (err) {
    return next(err)
  }
})

// delete a specific company
router.delete('/:code', async (req, res, next) => {
  try {
    const { code } = req.params

    const result = db.query('DELETE FROM companies WHERE code = $1', [code])

    return res.send({ msg: 'DELETED!'})
  } catch(err) {
    return next(err)
  }
})

module.exports = router;