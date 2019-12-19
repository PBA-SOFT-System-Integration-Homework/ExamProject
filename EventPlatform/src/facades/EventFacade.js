import  { makeOptions } from '../utils/helperMethods'

const URL = "http://event-platform-backend-kub-service:4000/api/v1/events";

class EventFacade {

    async getEvents() {
        let events = await fetch(URL).then(res => {
            return res.json();
        });
        return events;
    }

    async addEvent(event) {
        let data = makeOptions("POST", event);
        let evt = await fetch(URL, data).then(res => {
            return res.json();
        });
        return evt;
    }

  }
  let eventFacade = new EventFacade();
  export default eventFacade;