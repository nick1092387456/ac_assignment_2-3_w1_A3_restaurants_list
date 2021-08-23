const express = require('express')
const router = express.Router()
const List = require('../../models/list')

//index
router.get('/', (req, res) => {
  const userId = req.user._id
  List.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((lists) => res.render('index', { lists }))
    .catch((error) => console.log('index error'))
})

module.exports = router
