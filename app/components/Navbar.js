import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'
import { startNewTrip } from './utils/newTrip'

function logout () {
  auth
  .signOut()
  .then(() => browserHistory.push('/landing'))
  .catch(function(error) {
    let errorCode = error.code
    let errorMessage = error.message
    console.log('ERROR', errorCode, errorMessage)
  })
}

export default class NavbarComponent extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      tripId: null,
    }
    this.renderButtons = this.renderButtons.bind(this)
  }

  componentWillMount () {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
        this.setState({ user: user })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  renderButtons () {
    if (this.state.user && this.state.user.emailVerified) {
      return (
        <div>
          <Nav pullRight>
            <LinkContainer to="/timeline">
              <NavItem eventKey={1}>Timeline</NavItem>
            </LinkContainer>
            <NavItem onClick={(startNewTrip)} eventKey={1}>New Trip</NavItem>
            <LinkContainer to="/suitcase">
              <NavItem eventKey={2}>Suitcase</NavItem>
            </LinkContainer>
            <LinkContainer className="logout-button" active={false} onSelect={logout} to="/">
              <NavItem eventKey={3}>Log Out</NavItem>
            </LinkContainer>
          </Nav>
        </div>
      )
    }
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">voyagr</a>
          </Navbar.Brand>
          <span>collaborative multimedia travel journals</span>
        </Navbar.Header>
        { this.renderButtons() }
      </Navbar>
    )
  }
}

