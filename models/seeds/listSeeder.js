//載入資料
const mongoose = require('mongoose')
const data = require('../../restaurant.json')
const restaurantList = data.results
const List = require('../list')

//設定連線
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//取得連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

//建立資料
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.forEach((restaurant) => {
    List.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })
  console.log('done')
})
