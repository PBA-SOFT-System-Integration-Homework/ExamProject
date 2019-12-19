import  { makeOptions } from '../utils/helperMethods'

const URL_AUTH = "http://event-platform-backend-kub-service:4000/api/v1/auth";
const URL_USER = "http://event-platform-backend-kub-service:4000/api/v1/users";

class UserFacade {

    async login(credentials) {
        let data = makeOptions("POST", credentials);
        let response = await fetch(URL_AUTH, data).then(res => {
            return res.json();
        });
        return response;
    }

    async createUser(credentials) {
        let data = makeOptions("POST", credentials);
        let user = await fetch(URL_USER, data).then(res => {
            return res.json();
        });
        return user;
    }

}
let userFacade = new UserFacade();
export default userFacade;