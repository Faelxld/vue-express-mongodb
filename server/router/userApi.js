const express = require('express')
const router = express.Router()

const crypto = require('crypto') // md5 加密
const moment = require('moment')

const model = require('../config/db.js')
const createToken = require('../middleware/createToken.js')
const checkToken = require('../middleware/checkToken.js')
const objectIdToTimestamp = require('objectid-to-timestamp')

const jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '404',
      msg: 'server is error'
    })
  } else {
    res.json(ret)
  }
}

router.post('/useradd', (req, res, next) => {
  const params = req.body

  const id = params.userId
  const pwd = params.userPwd
  const md5 = crypto.createHash('md5')
  const password = md5.update(pwd)
    .digest('hex') //加密后的密码

  const user = new model.User({
    userId: id,
    userPwd: password,
    token: createToken(id)
  })
  user.create_time = moment(objectIdToTimestamp(user._id))
    .format('YYYY-MM-DD HH:mm:ss')

  let reg_pwd = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,20}$/
  let reg_id = /^([0-9]){9}$/

  if (reg_id.test(id) && reg_pwd.test(pwd)) {
    model.User.findOne({
      userId: user.userId
    }, (err, doc) => {
      if (err) console.log(err)
      if (doc) {
        const result = {
          code: 50,
          msg: 'Error! Existing ID',
          tip: 'Go to Login ..'
        }
        jsonWrite(res, result)
      } else {
        user.save(err => {
          if (err) {
            const result = {
              code: 100,
              msg: 'Error! Error ID or password',
              tip: 'Change your ID or password ...'
            }
            jsonWrite(res, result)
          } else {
            const result = {
              code: 200,
              msg: 'Success! Welcome to join us',
              tip: 'Go to Login ...'
            }
            jsonWrite(res, result)
          }
        })
      }
    })
  } else {
    const result = {
      code: 100,
      msg: 'Error! Error ID or password',
      tip: 'Change your ID or password ...'
    }
    jsonWrite(res, result)
  }
})

router.post('/login', (req, res, next) => {
  const params = req.body

  const id = params.userId
  const pwd = params.userPwd
  const md5 = crypto.createHash('md5')
  const password = md5.update(pwd)
    .digest('hex') //加密后的密码

  const user = new model.User({
    userId: id,
    userPwd: password,
    token: createToken(id)
  })

  model.User.findOne({
    userId: user.userId
  }, (err, doc) => {
    if (err) console.log(err)
    if (!doc) {
      const result = {
        code: 50,
        msg: 'Error! Nonexistent ID',
        tip: 'Go to Register ...'
      }
      jsonWrite(res, result)
    } else if (user.userPwd === doc.userPwd) {
      const result = {
        code: 200,
        userId: doc.userId,
        time: moment(objectIdToTimestamp(doc._id))
          .format('YYYY-MM-DD HH:mm:ss'),
        token: createToken(id),
        msg: 'Success! Welcome to join us',
        tip: 'Welcome to join us ...'
      }
      jsonWrite(res, result)
    } else {
      const result = {
        code: 100,
        msg: 'Error! Error password',
        tip: 'Reload your password ...'
      }
      jsonWrite(res, result)
    }
  })
})

router.get('/getuser', checkToken, (req, res, next) => {
  model.User.find({}, (err, doc) => {
    if (err) console.log(err)
    jsonWrite(res, doc)
  })
})

module.exports = router
