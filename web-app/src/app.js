import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
import Home from 'components/pages/Home'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact={true} component={Home}/>
      </Router>
    )
  }
}

render(<App />, document.getElementById('app'))
