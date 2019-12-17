import  { makeOptions } from '../utils/helperMethods'

const URL_AUTH = "http://167.172.98.125:4000/api/v1/auth";
const URL_USER = "http://167.172.98.125:4000/api/v1/users";

class UserFacade {

    async login(credentials) {
        let data = makeOptions("POST", credentials);
        let user = await fetch(URL_AUTH, data).then(res => {
            return res.json();
        });
        return user;
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