//Include express from node_modules
const express = require('express')
const app = express()

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//Include handlebars
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

//載入BodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//載入Model
const List = require('./models/list')

//載入mongoose
const mongoose = require('mongoose')
const { findById } = require('./models/list')
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//取得連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//Define server related variables
const port = 3000

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//setting route and response
//index
app.get('/', (req, res) => {
  List.find()
    .lean()
    .then((lists) => res.render('index', { lists }))
    .catch((error) => console.log('index error'))
})

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  List.find()
    .lean()
    .then((lists) => {
      lists = lists.filter(
        (list) =>
          list.name.toLowerCase().includes(keyword) ||
          list.category.toLowerCase().includes(keyword)
      )
      res.render('index', { lists, keyword: keyword })
    })
    .catch((error) => console.log('search route error'))
})

//create
app.get('/lists/new', (req, res) => {
  return res.render('new')
})

app.post('/lists', (req, res) => {
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
app.get('/lists/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  return List.findById(id)
    .lean()
    .then((list) => res.render('detail', { list }))
    .catch((error) => console.log(error))
})

//edit
app.get('/lists/:list_id/edit', (req, res) => {
  const id = req.params.list_id

  return List.findById(id)
    .lean()
    .then((list) => res.render('edit', { list }))
    .catch((error) => console.log('edit page error'))
})

app.post('/lists/:list_id/edit', (req, res) => {
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
    .catch((error) => console.log('edit post route error'))
})

//delete
app.post('/lists/:id/delete', (req, res) => {
  const id = req.params.id
  return List.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log('delete route error'))
})

//Start and listen the server
app.listen(port, () => {
  console.log(`Server is started`)
})
