import React, { useState, useEffect } from 'react'
import { useForkRef } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import axios from 'axios'

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
