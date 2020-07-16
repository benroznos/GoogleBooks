const { model, Schema } = require('mongoose')

const bookSchema = new Schema({
  title: String,
  author: [{
    type: String
  }],
  image: String,
  description: String
})

module.exports = model('Book', bookSchema)