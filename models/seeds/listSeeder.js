//載入資料
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const List = require('../list')
const User = require('../../models/user')
const data = require('../../restaurant.json')
const restaurantList = data.results
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '123456',
}

//建立資料
db.once('open', () => {
  console.log('mongodb connected!')
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id
      console.log('generating list...')
      return Promise.all(
        Array.from(restaurantList, (restaurant) => {
          return List.create({
            userId,
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
      )
    })
    .then(() => {
      console.log('seeder done.')
      process.exit()
    })
})
