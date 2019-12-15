import  { makeOptions, handleHttpErrors } from '../utils/helperMethods'

const URL = "### BACKEND URL ###";

class EventFacade {

    async getEvents() {
        let events = await fetch(URL).then(handleHttpErrors);
        return events;
    }

    async bookCarsForEvent(amountOfPeople) {
        let data = makeOptions("POST", amountOfPeople)
        let cars = await fetch(URL, data).then(handleHttpErrors);
        return cars;
    }

  }
  let EventFacade = new EventFacade();
  export default EventFacade;