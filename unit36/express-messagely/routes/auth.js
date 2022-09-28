const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body

    if (!username || !password || !first_name || !last_name || !phone) {
      throw new ExpressError('All fields are required', 404)
    }
    
    await User.register({username, password, first_name, last_name, phone})

    const token = jwt.sign({ username }, SECRET_KEY)

    return res.json({ message: 'Logged in!', token })
  } catch(err) {
    return next(err)
  }
})



/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      throw new ExpressError('Username and password required', 404)
    }

    const authUser = await User.authenticate(username, password)

    if (authUser) {
      const token = jwt.sign({ username }, SECRET_KEY)

      User.updateLoginTimestamp(username) // updates login timestamp

      return res.json({ token })
    } else {
      throw new ExpressError('Invalid username/password', 400)
    }
  } catch (err) {
    return next(err)
  }
})


module.exports = router;
