const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')

const Message = require('../models/message')
const { ensureLoggedIn } = require('../middleware/auth')

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 * NOTE => When posting a message, need user's login token
 *         Doing a POST request requires { to_username, body, _token }
 **/
 router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const msg = {
      from_username: req.user.username,
      to_username: req.body.to_username,
      body: req.body.body
    }

    await Message.create(msg)

    return res.json({ message: msg })
  } catch (err) {
    return next(err)
  }
})


/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 * NOTE => When doing a GET request in Insomnia/Postman, include { _token } that is
 *          given when the user logs in
 **/
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username
    const msg = await Message.get(req.params.id)

    if (username !== msg.from_user.username &&  username !== msg.to_user.username) {
      throw new ExpressError('Unable to read message', 401)
    }

    return res.json({ message: msg })
  } catch (err) {
    return next(err)
  }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 * NOTE => Include  { _token } in the POST request in Insomnia/Postman that is given
 *          to the user when they log in
 **/
router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username
    const msg = await Message.get(req.params.id)

    if (username !== msg.to_user.username) {
      throw new ExpressError('Unable to set message to read', 401)
    }

    const message = await Message.markRead(req.params.id)

    return res.json({ message })
  } catch (err) {
    return next(err)
  }
})


module.exports = router