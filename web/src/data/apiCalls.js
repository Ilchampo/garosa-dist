import axios from 'axios';
const baseApiURL = 'http://localhost:3000/api/v1/';

export const apiUser = axios.create({
    baseURL: baseApiURL + 'users/',
});
