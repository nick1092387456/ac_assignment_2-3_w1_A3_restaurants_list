const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')
const users = require('./modules/users')

router.use('/', home)
router.use('/lists', lists)
router.use('/users', users)

module.exports = router
