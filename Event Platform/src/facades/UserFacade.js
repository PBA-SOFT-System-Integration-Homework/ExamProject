import  { makeOptions, handleHttpErrors } from '../utils/helperMethods'

const URL = "http://localhost:3000/api/v1/auth";

class UserFacade {

    async login(credentials) {
        let data = makeOptions("POST", credentials);
        let user = await fetch(URL, data).then(handleHttpErrors);
        return user;
    }

    async createUser(credentials) {
        let data = makeOptions("GET", credentials);
        let user = await fetch(URL, data).then(handleHttpErrors);
        return user;
    }

}
let userFacade = new UserFacade();
export default userFacade;