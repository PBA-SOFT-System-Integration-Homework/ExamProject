import  { makeOptions } from '../utils/helperMethods'

const URL = "http://localhost:3000/api/v1/events";

class EventFacade {

    async getEvents() {
        let events = await fetch(URL).then(res => {
            return res.json();
        });
        return events;
    }

    async bookCarsForEvent(amountOfPeople) {
        // let data = makeOptions("POST", amountOfPeople)
        // let cars = await fetch(URL, data).then(handleHttpErrors);
        // return cars;
    }

    async addEvent(event) {
        let data = makeOptions("POST", event);
        let events = await fetch(URL, data).then(res => {
            return res.json();
        });
        return events;
    }

  }
  let eventFacade = new EventFacade();
  export default eventFacade;