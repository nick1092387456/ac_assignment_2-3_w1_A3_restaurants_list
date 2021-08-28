//載入資料
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const List = require('../list')
const User = require('../../models/user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    res_index: [0, 1, 2],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    res_index: [3, 4, 5],
  },
]

//建立資料
db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, (SEED_USER, i) => {
      console.log(`user generating...`)

      return bcrypt
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
          const restaurants = Array.from(
            SEED_USER.res_index,
            (i) => restaurantList[i]
          )
          restaurants.forEach((restaurant) => {
            restaurant.userId = userId
          })
          return List.create(restaurants)

          // Array.from(restaurants, (restaurant) => {
          //   return List.create({
          //     userId,
          //     name: restaurant.name,
          //     name_en: restaurant.name_en,
          //     category: restaurant.category,
          //     image: restaurant.image,
          //     location: restaurant.location,
          //     phone: restaurant.phone,
          //     google_map: restaurant.google_map,
          //     rating: restaurant.rating,
          //     description: restaurant.description,
          //   })
          // })
        })
    })
  )
    .then(() => {
      console.log('seeder done.')
      process.exit()
    })
    .catch((error) => console.log(error))
})

// db.once('open', () => {
//   Promise.all(
//     Array.from(SEED_USER, (SEED_USER, i) => {
//       const restaurantIndexes = SEED_USER.res_index
//       console.log(restaurantIndexes)

//       return bcrypt
//         .genSalt(10)
//         .then((salt) => bcrypt.hash(SEED_USER.password, salt))
//         .then((hash) => User.create({ email: SEED_USER.email, password: hash }))
//         .then((user) => {
//           const userId = user._id
//           const restaurants = Array.from(
//             SEED_USER.res_index,
//             (i) => restaurantList[i]
//           )
//           restaurants.forEach((restaurant) => {
//             restaurant.userId = userId
//           })
//           return Restaurant.create(restaurants)
//         })
//     })
//   )
//     .then(() => {
//       console.log('All done!')
//       process.exit()
//     })
//     .catch((error) => console.log(error))
// })
