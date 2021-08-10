const express = require('express')
const router = express.Router()
const List = require('../../models/list')

//search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  List.find()
    .lean()
    .then((lists) => {
      lists = lists.filter(
        (list) =>
          list.name.toLowerCase().includes(keyword) ||
          list.category.toLowerCase().includes(keyword)
      )
      res.render('index', { lists, keyword })
    })
    .catch((error) => console.log('search route error'))
})

//create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/lists', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return List.create({
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log('create function error'))
})

//detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch((error) => console.log(error))
})

//edit
router.get('/:list_id/edit', (req, res) => {
  const id = req.params.list_id

  return List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch((error) => console.log('edit page error'))
})

router.put('/:list_id', (req, res) => {
  const id = req.params.list_id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return List.findById(id)
    .then((list) => {
      list.name = name
      list.category = category
      list.image = image
      list.location = location
      list.phone = phone
      list.google_map = google_map
      list.rating = rating
      list.description = description

      return list.save()
    })
    .then(() => res.redirect(`/lists/${id}`))
    .catch((error) => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return List.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
