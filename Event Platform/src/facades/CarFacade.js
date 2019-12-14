import  { makeOptions, handleHttpErrors } from '../utils/helperMethods'

const URL = "### BACKEND URL ###";

class CarFacade {

    async getCarsForEvent(event) {
        let cars = await fetch(URL + "cars/event/" + event, data).then(handleHttpErrors);
        return cars;
    }

  }
  let CarFacade = new CarFacade();
  export default CarFacade;