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
import CarsFacade from './facades/CarsFacade'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEventId: 1,
      currentEvent: {},
      userId: "",
      username: "", 
      password: "", 
      loggedIn: false, 
      role: "user",
      addEventName: "",
      addEventDescription: "",
      addEventDate: "",
      addEventAmoutOfPeople: "",
      addEventLocation: "",
      events: [],
      cars: []
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
      console.log(response)
      let events = await EventFacade.getEvents();
      this.setState({loggedIn: true, 
        role: response.role, 
        userId: response.id,
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

    if (isNaN(event[0].amountOfPeople)) alert("Input for 'Amount of people' is not a valid number..")
      
    else {
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
  }

  handleEventClick = async (evt) => {
    let id = evt.target.id
    let event = this.state.events.find(e => e.event_id == id)

    let cars = await CarsFacade.getCarsForEvent(id);
    if (cars.error) {
      alert(cars.error)
    } else {
      this.setState({ 
        currentEventId: id,
        currentEvent: event,
        cars: cars
       })
    }
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

  handleBookCar = async (evt) => {
    let carId = evt.target.id;
    let userId = this.state.userId

    let response = await CarsFacade.bookCar(carId, userId);

    if(response.error) alert(response.error)
    else {
      let cars = this.state.cars;
      cars = cars.map(car => {
        if(car.car_id == carId) 
          car.amount_of_seats_taken += 1;
        return car;
      })
      this.setState({
        cars: cars
      })
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
                <Modal id={this.state.currentEventId} event={this.state.currentEvent} cars={this.state.cars} handleBookCar={this.handleBookCar}/>
          </div>
      )
    }
  }
}

export default App;