import axios from 'axios';

class Auth {
    authenticated: boolean;
    constructor() {
        this.authenticated = false;
    }

    async authUser(): Promise<boolean> {
        return axios({
            method: "POST",
            url: "http://localhost:3001/user/heckLogin",
            headers: this.header,
        }).then(() => {
            return true;
        }).catch(() => {
            return false;
        })
    }

    get header(): typeof value {
        let value: any = {};
        value['Authorization'] = `Bearer ${this.token}`
        return value;
    }

    get token(): string | null {
        return localStorage.getItem('token');
    }
}

export default new Auth();
