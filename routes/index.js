const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // 掛載 middleware

router.use('/lists', authenticator, lists) //加入驗證程序
router.use('/users', users)
router.use('/', authenticator, home) // 加入驗證程序

module.exports = router
