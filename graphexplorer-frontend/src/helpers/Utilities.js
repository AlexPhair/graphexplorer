import axios from "axios";
import { AUTH_API_URL } from "../constants";

class Utilities {
    static isLoggedIn = () => {
        // This could be more robust by pinging the server to check if the token is valid.
        const token = this.getLoginToken();
        return !!token;
    };

    static isAdminPromise = () => {
        return this.getAuthenticatedAxiosRequest()
            .post(`${AUTH_API_URL}verify`)
            .then(res => res.data.is_admin);
    };

    static getLoginToken = () => {
        return localStorage.getItem('token');
    }

    static deleteLoginToken = () => {
        localStorage.removeItem('token');
    }

    static getAuthenticatedAxiosRequest = () => {
        return axios.create({
            headers: {'Authorization': `TOKEN ${this.getLoginToken()}`}
        })
    }
}

export default Utilities;