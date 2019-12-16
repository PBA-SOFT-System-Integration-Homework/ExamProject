import  { makeOptions } from '../utils/helperMethods'

const URL = "http://167.172.98.125:4000/api/v1/events";

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

  }
  let eventFacade = new EventFacade();
  export default eventFacade;