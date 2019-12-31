import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Signup from './components/SignUp'
import Events from './components/Events'
// import users from './data/users'
import AddEvent from './components/AddEvent'
import Modal from './components/Modal'
import UserFacade from './facades/UserFacade'
import EventFacade from './facades/EventFacade'
import CarsFacade from './facades/CarsFacade'
import CircularProgress from '@material-ui/core/CircularProgress';
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
      addEventCarType: "",
      addEventCarNumberOfSeats: "",
      events: [],
      cars: [],
      loadingSpinner: false
    }
  }

  handleInputChange = (event) => {
    let type = event.target.name
    let value = event.target.value
    this.setState({ [type]: value })
  }

  handleLogin = async (event) => {
    const { username, password } = this.state
    let credentials = { username: username, password: password }

    let response = await UserFacade.login(credentials)
    if (response.error) {
      alert(response.error)
    } else {
      let eventResp = await EventFacade.getEvents();
      if (eventResp.error) return alert('An error occured getting events')
      this.setState({
        loggedIn: true,
        role: response.user.role,
        userId: response.user.id,
        username: "",
        password: "",
        events: eventResp.events
      })
    }
  }

  addEvent = async (evt) => {
    this.setState({
      loadingSpinner: true
    });

    let event = [{
      name: this.state.addEventName,
      description: this.state.addEventDescription,
      date: this.state.addEventDate,
      amountOfPeople: this.state.addEventAmoutOfPeople,
      location: this.state.addEventLocation,
      carType: this.state.addEventCarType,
      numberOfSeats: this.state.addEventCarNumberOfSeats
    }]

    if (isNaN(event[0].amountOfPeople)) alert("Input for 'Amount of people' is not a valid number..")
    else if (isNaN(event[0].numberOfSeats)) alert("Input for 'Minimum number of seats for cars' is not a valid number..")
    else if (event[0].numberOfSeats < 0 || event[0].numberOfSeats > 9) alert("For 'Minimum number of seats for cars', please choose a number between 0-9")
    else if (['A', 'B', 'C', 'D', 'E'].indexOf(event[0].carType) === -1) alert("carType has to be one of the follow (A, B, C, D, E)")
    else {
      let response = await EventFacade.addEvent(event[0]);
      if (response.error) alert(response.error)
      else {
        event[0]['event_id'] = response.generatedEventId
        event[0]['amount_of_people'] = event[0].amountOfPeople
        delete event[0].amountOfPeople
        delete event[0].carType
        delete event[0].numberOfSeats
        this.setState(prevState => {
          return {
            events: prevState.events.concat(event),
            addEventName: "",
            addEventDescription: "",
            addEventDate: "",
            addEventAmoutOfPeople: "",
            addEventLocation: "",
            addEventCarType: "",
            addEventCarNumberOfSeats: "",
            loadingSpinner: false
          };
        });
      }
    }
  }

  handleEventClick = async (evt) => {
    let id = evt.target.id
    let event = this.state.events.find(e => e.event_id === Number(id))
    let result = await CarsFacade.getCarsForEvent(id);
    if (result.error) {
      alert(result.error)
    } else {
      this.setState({
        currentEventId: id,
        currentEvent: event,
        cars: result.cars
      })
    }
  }

  handleCreateUser = async (evt) => {
    const { username, password } = this.state
    let response = await UserFacade.createUser({ newUser: { username: username, password: password } })
    if (response.error) alert(response.error);
    else {
      alert(response.user);
      this.setState({
        loggedIn: true,
        role: response.user.role,
        username: "",
        password: ""
      })
    }
  }

  handleBookCar = async (evt) => {
    let carId = evt.target.id;
    let userId = this.state.userId

    let response = await CarsFacade.bookCar(carId, userId);

    if (response.error) alert(response.error)
    else {
      let cars = this.state.cars;
      cars = cars.map(car => {
        if (car.car_id === carId)
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
            <hr />
            <Route exact path="/" render={() => <SignIn handleInputChange={this.handleInputChange} handleLogin={this.handleLogin} />} />
            <Route exact path="/signUp" render={() => <Signup handleInputChange={this.handleInputChange} handleCreateUser={this.handleCreateUser} />} />
          </div>
        </Router>
      )
    } else {
      return (
        <div>
          {this.state.role === "admin" && (
            <AddEvent
              addEvent={this.addEvent}
              handleInputChange={this.handleInputChange}
              state={this.state}
            />)}
          {this.state.loadingSpinner && (
            <div className='loading-spinner'>
              <CircularProgress size={60} />
            </div>
          )}
          <Events role={this.state.role}
            events={this.state.events}
            addEvent={this.addEvent}
            handleInputChange={this.handleInputChange}
            state={this.state}
            handleEventClick={this.handleEventClick}
          />
          <Modal
            id={this.state.currentEventId}
            event={this.state.currentEvent}
            cars={this.state.cars}
            handleBookCar={this.handleBookCar}
          />
        </div>
      )
    }
  }
}

export default App;