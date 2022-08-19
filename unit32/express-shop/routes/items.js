const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const items = require('../fakeDb')

router.get('/', (req, res) => res.json({ items }))

router.post('/', (req, res, next) => {
  try {
    if (!req.body.name || !req.body.price) {
      throw new ExpressError(`Both name and price are required`, 400)
    }

    const newItem = { name: req.body.name, price: req.body.price }

    items.push(newItem)

    return res.status(201).json({ added: newItem })
  } catch (err) {
    return next(err)
  }
})

router.get('/:name', (req, res) => {
  const findItem = items.find(i => i.name === req.params.name)
  console.log('ITEM ====> ', findItem)
  if (findItem === undefined) {
    throw new ExpressError('Item not found', 404)
  }

  res.json({ item: findItem })
})

module.exports = router