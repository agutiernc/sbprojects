// Routes for invoices

const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const db = require('../db')

// get all invoices
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM invoices')

    return res.json({ inovices: result.rows })
  } catch(err) {
    return next(err)
  }
})

// get specific invoice
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await db.query(`
      SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description
      FROM invoices AS i
      JOIN companies AS c
      ON i.comp_code = c.code
      WHERE id = $1
      `, [id])

    if (result.rows.length === 0) {
      throw new ExpressError(`Unable to find invoice with id of ${id}`, 404)
    }

    const data = result.rows[0]

    const invoice = {
      id: data.id,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description,
      },
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date
    }

    return res.json({ invoices: invoice })
  } catch(err) {
    return next(err)
  }
})

// add an invoice
router.post('/', async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body

    const results = await db.query(`
      INSERT INTO invoices (comp_code, amt)
      VALUES ($1, $2)
      RETURNING id, comp_code, amt, paid, add_date, paid_date
    `, [comp_code, amt])

    return res.status(201).json({ invoice: results.rows[0] })
  } catch(err) {
    return next(err)
  }
})

// update existing invoice
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { amt } = req.body

    // get current info about specific invoice
    const currResult = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id])

    if (currResult.rows.length === 0) {
      throw new ExpressError(`Invoice #${id} does not exist`, 404)
    }

    let currPaidDate = currResult.rows[0].paid_date
    let currPaid = currResult.rows[0].paid
    const currAmt = currResult.rows[0].amt

    // validate amount given before proceeding
    if (amt < currAmt) {
      return res.send({ msg: `Amount is less than Invoice amount of ${currAmt}`})
    } else if (amt > currAmt) {
      return res.send({ msg: `Amount is more than Invoice amount of ${currAmt}`})
    }

    // Update invoice if paid
    if (!currPaid && !currPaidDate) {
      currPaidDate = new Date()
      currPaid = true
    } else {
      return res.send({ msg: 'Invoice has already been paid.'})
    }

    const result = await db.query(`
      UPDATE invoices
      SET amt = $1, paid = $2, paid_date = $3
      WHERE id=$4
      RETURNING id, comp_code, amt, paid, add_date, paid_date
    `, [amt, currPaid, currPaidDate, id])


    return res.json({ invoice: result.rows[0] })
  } catch(err) {
    return next(err)
  }
})


// delete specific invoice
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const result = db.query('DELETE FROM invoices WHERE id = $1', [id])

    return res.send({ msg: 'DELETED!'})
  } catch(err) {
    return next(err)
  }
})

module.exports = router