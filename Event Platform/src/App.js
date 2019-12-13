import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Events from './components/Events'
import users from './data/users'
import AddEvent from './components/AddEvent'
import Modal from './components/Modal'


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
      events: [
        {
            name: "Christmas Party",
            date: "28/09/2020",
            description: "Get drunk with your colleagues! Pure heaven...",
            amountOfPeople: "75"
        },
        {
            name: "Obligatory meeting",
            date: "21/09/2020",
            description: "Meeting regarding the new transformation shaping our upcoming future...",
            amountOfPeople: "50"
        },
        {
            name: "Pool Party",
            date: "09/09/2020",
            description: "The biggest corporate pool party to come. You'll have to sign up to find out more...",
            amountOfPeople: "100"
        }
      ]
    }
  }

  handleInputChange = (event) => {
    let type = event.target.id
    let value = event.target.value
    this.setState({ [type]: value })
  } 

  handleLogin = (event) => {
    let username = this.state.username
    let password = this.state.password

    users.forEach(user => {
      if (username === user.username && password === user.password) {
        this.setState({loggedIn: true, role: user.role})
      }
    })
  } 

  addEvent = (evt) => {
    let event = [{
      name: this.state.addEventName,
      description: this.state.addEventDescription,
      date: this.state.addEventDate,
      amountOfPeople: this.state.addEventAmoutOfPeople
    }]
    this.setState(prevState => {
      return {
        events: prevState.events.concat(event),
        addEventName: "",
        addEventDescription: "",
        addEventDate: "",
        addEventAmoutOfPeople: ""
      };
    });
  }

  handleEventClick = (evt) => {
    console.log(evt)
    let id = evt.target.id
    console.log("evt. taget " + id)
    this.setState({ currentEvent: id })
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <SignIn handleInputChange={this.handleInputChange} handleLogin={this.handleLogin}/>
          {JSON.stringify(users)}
        </div>
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