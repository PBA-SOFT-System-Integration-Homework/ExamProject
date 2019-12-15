import  { handleHttpErrors } from '../utils/helperMethods'

const URL = "### BACKEND URL ###";

class CarFacade {

    async getCarsForEvent(event) {
        let cars = await fetch(URL + "cars/event/" + event).then(handleHttpErrors);
        return cars;
    }

  }
  let CarFacade = new CarFacade();
  export default CarFacade;