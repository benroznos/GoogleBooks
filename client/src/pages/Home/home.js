import React, { useState } from './node_modules/react'
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

const Home = () => {
  const classes = useStyles()
  const [bookState, setBookState] = useState({
    search: '',
    books: [],
  })

  bookState.handleInputChange = (event) => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  bookState.handleSearchBook = (event) => {
    event.preventDefault()
    axios
      .get(`/api/gbook/${bookState.search}`)
      .then(({ data }) => {
        console.log(data)
        setBookState({ ...bookState, books: data })
      })
      .catch((e) => console.error(e))
  }

  bookState.handleSaveBook = (book) => {
    axios.post('/api/books', {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      image: book.volumeInfo.imageLinks.thumbnai,
      description: book.volumeInfo.description
    })
      .then(() => {
        const books = bookState.books
        const booksFiltered = books.filter(volume => volume.id !== book.id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(e => console.log(e))
  }
  return (
    <>
      <form onSubmit={bookState.handleSearchBook}>
        <TextField
          label="Search Google Books"
          variant="outlined"
          name="search"
          value={bookState.search}
          onChange={bookState.handleInputChange}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={bookState.handleSearchBook}
        >
          Search
				</Button>
      </form>
      <div>
        {bookState.books.map((book) => (
          <Card className={classes.root}>
            <CardHeader title={book.volumeInfo.title} />
            <CardMedia
              className={classes.media}
              image={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.authors}
            />
            <CardContent>{book.volumeInfo.description}</CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => bookState.handleSaveBook(book)}
              >
                Save
							</Button>
              <Button href={book.volumeInfo.infoLink}>Visit</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Home
