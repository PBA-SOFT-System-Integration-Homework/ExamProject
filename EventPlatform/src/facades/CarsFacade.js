import  { makeOptions } from '../utils/helperMethods'
const URL = "http://167.172.98.125:4000/api/v1/cars";

class CarsFacade {

    async getCarsForEvent(event_id) {
        let cars = await fetch(URL + `/${event_id}`).then(res => {
            return res.json();
        });
        return cars;
    }

    async bookCar(carId, userId) {
        let data = makeOptions("POST", {carId: carId, userId: userId});
        let cars = await fetch(URL, data).then(res => {
            return res.json();
        });
        return cars;
    }

  }
  let carsFacade = new CarsFacade();
  export default carsFacade;
  