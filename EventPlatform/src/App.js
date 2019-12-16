import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
import Events from './components/Events'
import users from './data/users'
import AddEvent from './components/AddEvent'
import Modal from './components/Modal'
import UserFacade from './facades/UserFacade'
import EventFacade from './facades/EventFacade'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvent: 1,
      username: "", 
      password: "", 
      loggedIn: false, 
      role: "user",
      addEventName: "",
      addEventDescription: "",
      addEventDate: "",
      addEventAmoutOfPeople: "",
      addEventLocation: "",
      events: []
    }
  }

  handleInputChange = (event) => {
    let type = event.target.id
    let value = event.target.value
    this.setState({ [type]: value })
  } 

  handleLogin = async (event) => {
    const { username, password } = this.state
    let credentials = {username: username, password: password}

    let response = await UserFacade.login(credentials)
    if (response.error) {
      alert(response.error)
    } else {
      let events = await EventFacade.getEvents();
      this.setState({loggedIn: true, 
        role: response.role, 
        username: "", 
        password: "",
        events: events})
    }
  } 

  addEvent = async (evt) => {
    let event = [{
      name: this.state.addEventName,
      description: this.state.addEventDescription,
      date: this.state.addEventDate,
      amountOfPeople: this.state.addEventAmoutOfPeople,
      location: this.state.addEventLocation
    }]

    let response = await EventFacade.addEvent(event[0]);

    if (response.error) alert(response.error)
    else {
      this.setState(prevState => {
        return {
          events: prevState.events.concat(event),
          addEventName: "",
          addEventDescription: "",
          addEventDate: "",
          addEventAmoutOfPeople: "",
          addEventLocation: ""
        };
      });
    }
  }

  handleEventClick = (evt) => {
    let id = evt.target.id
    this.setState({ currentEvent: id })
  }

  handleCreateUser = async (evt) => {
    const { username, password } = this.state
    let response = await UserFacade.createUser({newUser: {username: username, password: password}})
    if (response.error) alert(response.error);
    else {
      alert(response.succces);
      this.setState({loggedIn: true, 
        role: response.role, 
        username: "", 
        password: ""})
      }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <Router>
          <div>
            <header>
              <NavLink exact to="/">Sign In</NavLink>
              <NavLink exact to="/signUp">Sign Up</NavLink>
            </header>
            <hr/>
            <Route exact path="/" render={() => <SignIn handleInputChange={this.handleInputChange} handleLogin={this.handleLogin}/>}/>
            <Route exact path="/signUp" render={() => <Signup handleInputChange={this.handleInputChange} handleCreateUser={this.handleCreateUser} />} />
            {JSON.stringify(users)}
          </div>
        </Router>
        )
    } else {
        return (
          <div>
             {JSON.stringify(this.state)}
             {this.state.role === "admin" ? (
               <div>
                <AddEvent 
                  events={this.state.events}
                  addEvent={this.addEvent}
                  handleInputChange={this.handleInputChange}
                  state={this.state}
                />
                </div>  
              ) : (
                ""
            )}
             <Events role={this.state.role}
              events={this.state.events}
              addEvent={this.addEvent}
              handleInputChange={this.handleInputChange}
              state={this.state}
              handleEventClick={this.handleEventClick}
              />
              <Modal id={this.state.currentEvent} event={this.state.events[this.state.currentEvent]} />
          </div>
      )
    }
  }
}

export default App;