//Include express from node_modules
const express = require('express')
const app = express()
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

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//Include handlebars
const exphbs = require('express-handlebars')

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
  res.render('index', { restaurants: restaurantList.results })
})

//show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//Start and listen the server
app.listen(port, () => {
  console.log(`Server is started`)
})
