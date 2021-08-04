const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
})
module.exports = mongoose.model('List', listSchema)
