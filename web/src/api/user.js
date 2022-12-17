import axios from 'axios';

const baseApiURL = 'http://localhost:3000/api/v1/';

export const userApi = axios.create({
    baseURL: baseApiURL + 'users/',
});
