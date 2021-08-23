const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose.js')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

const port = 3000

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
)
usePassport(app)

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//載入BodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

//Start and listen the server
app.listen(port, () => {
  console.log(`Server is started`)
})
