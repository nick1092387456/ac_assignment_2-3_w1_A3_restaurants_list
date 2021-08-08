const express = require('express')
const router = express.Router()
const List = require('../../models/list')

//index
router.get('/', (req, res) => {
  List.find()
    .lean()
    .then((lists) => res.render('index', { lists }))
    .catch((error) => console.log('index error'))
})

module.exports = router
