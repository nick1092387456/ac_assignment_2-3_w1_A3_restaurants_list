//載入資料
const db = require('../../config/mongoose')
const data = require('../../restaurant.json')
const restaurantList = data.results
const List = require('../list')

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
