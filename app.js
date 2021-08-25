const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const session = require('express-session')
const usePassport = require('./config/passport')
require('./config/mongoose.js')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

const PORT = process.env.PORT

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//載入餐廳Json檔
const restaurantList = require('./restaurant.json')

//載入BodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

//Start and listen the server
app.listen(PORT, () => {
  console.log(`Server is started`)
})
