import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Saved from './pages/Saved'
import Navbar from './components/Navbar'
import Container from '@material-ui/core/Container'

const App = () => {
  return (
    <Router>
      <div>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/saved">
              <Saved />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default App