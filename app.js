//Include express from node_modules
const express = require('express')
const app = express()

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//Include handlebars
const exphbs = require('express-handlebars')

//載入Model
const List = require('./models/list')

//載入mongoose
const mongoose = require('mongoose')
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
    .then((lists) => res.render('index', { restaurants: lists }))
    .catch((error) => console.log('error'))
})

//show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return List.findById(id)
    .lean()
    .then((list) => res.render('show', { restaurant: list }))
    .catch((error) => console.log('error'))
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
      res.render('index', { restaurants: lists, keyword: keyword })
    })
    .catch((error) => console.log('search part error'))
})

//Start and listen the server
app.listen(port, () => {
  console.log(`Server is started`)
})
