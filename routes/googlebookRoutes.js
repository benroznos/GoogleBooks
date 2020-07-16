const router = require('express').Router()
const axios = require('axios')
const { Book } = require('../models/')

router.get('/gbook/:search', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}`)
    .then(({ data }) => {
      Book.find()
        .then(books => {
          const booksFiltered = data.items.filter(book => {
            let keep = true
            books.forEach(saved => {
              if (saved.id === book.id) {
                keep = false
              }
            })
            return keep
          })
          res.json(booksFiltered)
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.error(e))
})

module.exports = router