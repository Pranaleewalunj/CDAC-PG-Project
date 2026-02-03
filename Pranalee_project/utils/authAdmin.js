const jwt = require("jsonwebtoken")
const config = require("./config")

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" })
  }
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" })
  }

  try {
    const decoded = jwt.verify(token, config.SECRET)

    req.admin_id = decoded.admin_id

    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" })
  }
}
