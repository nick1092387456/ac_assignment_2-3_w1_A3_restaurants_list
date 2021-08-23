const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  name_en: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    require: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    require: true,
    trim: true,
  },
  phone: {
    type: String,
    require: true,
    trim: true,
  },
  google_map: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
})
module.exports = mongoose.model('list', listSchema)
