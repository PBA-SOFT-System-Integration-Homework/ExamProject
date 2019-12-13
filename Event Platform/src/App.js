import './App.css';
import React from 'react'
import SignIn from './components/SignIn'
import Events from './components/Events'
import users from './data/users'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", 
      password: "", 
      loggedIn: false, 
      role: "user",
      addEventName: "",
      addEventDescription: "",
      addEventDate: "",
      events: [
        {
            name: "Christmas Party",
            date: "28/09/2020",
            describtion: "Get drunk with your colleagues! Pure heaven..."
        },
        {
            name: "Obligatory meeting",
            date: "21/09/2020",
            describtion: "Meeting regarding the new transformation shaping our upcoming future..."
        },
        {
            name: "Pool Party",
            date: "09/09/2020",
            describtion: "The biggest corporate pool party to come. You'll have to sign up to find out more..."
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
      if (username == user.username && password == user.password) {
        this.setState({loggedIn: true, role: user.role})
      }
    })
  } 

  addEvent = (evt) => {
    let event = [{
      name: this.state.addEventName,
      describtion: this.state.addEventDescription,
      date: this.state.addEventDate
    }]
    this.setState(prevState => {
      return {
        events: prevState.events.concat(event),
        addEventName: "",
        addEventDescription: "",
        addEventDate: "",
      };
    });
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
             <Events role={this.state.role}
              events={this.state.events}
              addEvent={this.addEvent}
              handleInputChange={this.handleInputChange}
              state={this.state}
              />
          </div>
      )
    }
    
  }
}

export default App;