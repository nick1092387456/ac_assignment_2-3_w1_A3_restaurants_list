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

//載入mongoose
const mongoose = require('mongoose')
const { findById } = require('./models/list')
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//載入method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//引用路由器
const routes = require('./routes')
//將request導入
app.use(routes)

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

//Start and listen the server
app.listen(port, () => {
  console.log(`Server is started`)
})
