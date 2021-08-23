//Include express from node_modules
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//載入mongoose config
require('./config/mongoose')

//Include handlebars
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

//載入BodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//載入method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//引用路由器
const routes = require('./routes')

usePassport(app)
//將request導入
app.use(routes)

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
)

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
