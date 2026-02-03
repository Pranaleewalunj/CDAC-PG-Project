const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res
      .status(401)
      .json({ status: 'error', error: 'Token is Missing' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, config.SECRET)
    req.customer_id = payload.customer_id
    next()
  } catch {
    return res
      .status(401)
      .json({ status: 'error', error: 'Invalid Token' })
  }
}
