import React, { useState, useEffect } from './node_modules/react'
import { useForkRef } from './node_modules/@material-ui/core'
import { makeStyles } from './node_modules/@material-ui/core/styles'
import TextField from './node_modules/@material-ui/core/TextField'
import Button from './node_modules/@material-ui/core/Button'
import Card from './node_modules/@material-ui/core/Card'
import CardActionArea from './node_modules/@material-ui/core/CardActionArea'
import CardActions from './node_modules/@material-ui/core/CardActions'
import CardContent from './node_modules/@material-ui/core/CardContent'
import CardMedia from './node_modules/@material-ui/core/CardMedia'
import Typography from './node_modules/@material-ui/core/Typography'
import CardHeader from './node_modules/@material-ui/core/CardHeader'
import axios from './node_modules/axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 192,
    width: 128,
  },
})

const Saved = () => {
  const classes = useStyles()
  const [bookState, setBookState] = useState({
    books: [],
  })

  bookState.handleDeleteBook = (book) => {
    axios.delete(`/api/books/${book._id}`)
      .then(() => {
        const books = JSON.parse(JSON.stringify(bookState.books))
        const booksFiltered = books.filter(volume => volume.id !== book.id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    axios
      .get('/api/books')
      .then(({ data }) => {
        setBookState({ ...bookState, books: data })
      })
      .catch((e) => console.error(e))
  })

  return (
    <div>
      {bookState.books.map((book) => (
        <Card className={classes.root}>
          <CardHeader title={book.title} />
          <CardMedia
            className={classes.media}
            image={book.image}
            title={book.author}
          />
          <CardContent>{book.description}</CardContent>
          <CardActions>
            <Button
              size="small"
              color="secondary"
              onClick={() => bookState.handleDeleteBook(book)}
            >
              Delete
						</Button>
            <Button href={book.link}>Visit</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default Saved
