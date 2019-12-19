import { makeOptions } from '../utils/helperMethods'
const URL = "http://event-platform-backend-kub-service:4000/api/v1/cars";

class CarsFacade {

    async getCarsForEvent(event_id) {
        let response = await fetch(URL + `/event/${event_id}`).then(res => {
            return res.json();
        });
        return response;
    }

    async bookCar(carId, userId) {
        let data = makeOptions("POST", { carId: carId, userId: userId });
        let cars = await fetch(URL, data).then(res => {
            return res.json();
        });
        return cars;
    }

}
let carsFacade = new CarsFacade();
export default carsFacade;
