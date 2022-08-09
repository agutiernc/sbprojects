const express = require('express')
const app = express()
const ExpressError = require('./expressError')
const { validateArray, findMean, findMode, findMedian } = require('./helpers')

app.get('/mean', (req, res, next) => {
  // throw error if no nums query is available in URL
  if (!req.query.nums) {
    throw new ExpressError(`Use a comma-separated list of numbers with query key - nums`, 400)
  }

  const numsArr = req.query.nums.split(',')
  let nums = validateArray(numsArr)

  // throw Error if an element is not a valid number
  if (nums instanceof Error) throw new ExpressError(nums.message)

  let mean = findMean(nums)

  return res.json({ "operation": 'mean', "value": mean })
})

app.get('/median', (req, res, next) => {
  // throw error if no nums query is available in URL
  if (!req.query.nums) {
    throw new ExpressError(`Use a comma-separated list of numbers with query key - nums`, 400)
  }

  const numsArr = req.query.nums.split(',').sort((a, b) => a - b)
  let nums = validateArray(numsArr)

  // throw Error if an element is not a valid number
  if (nums instanceof Error) throw new ExpressError(nums.message)

  let median = findMedian(nums)

  return res.json({ "operation": 'median', "value": median })
})

app.get('/mode', (req, res, next) => {
  // throw error if no nums query is available in URL
  if (!req.query.nums) {
    throw new ExpressError(`Use a comma-separated list of numbers with query key - nums`, 400)
  }
  
  const numsArr = req.query.nums.split(',')
  let nums = validateArray(numsArr)
  
  // throw Error if an element is not a valid number
  if (nums instanceof Error) throw new ExpressError(nums.message)

  let mode = findMode(nums)

  return res.json({ "operation": 'mode', "value": mode })
})


// ===== Error Handling =====
app.use((req, res, next) => {
  const err = new ExpressError('404 Error - Not Found', 404)

  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  
  return res.json({ error: err, message: err.message })
})

app.listen(3000, () => console.log('Server running on port 3000'))
