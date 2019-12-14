import  { makeOptions, handleHttpErrors } from '../utils/helperMethods'

const URL = "### BACKEND URL ###";

class UserFacade {

    async login(credentials) {
        let data = makeOptions("GET", credentials);
        let user = await fetch(URL, data).then(handleHttpErrors);
        return user;
    }

}
let UserFacade = new UserFacade();
export default UserFacade;