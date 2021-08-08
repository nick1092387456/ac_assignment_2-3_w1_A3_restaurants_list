const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const lists = require('./modules/lists')

router.use('/', home)
router.use('/lists', lists)

module.exports = router
