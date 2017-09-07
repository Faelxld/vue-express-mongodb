// 监测 token 是否过期
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  let token = req.headers['authorization'].split(' ')[1]
  let decoded = jwt.decode(token, 'secret')

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.json({
      code: 401,
      tip: 'Token is overdue'
      message: 'Login again'
    })
  }
  next()
}
