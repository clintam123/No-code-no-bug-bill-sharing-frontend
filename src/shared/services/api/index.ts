import axios from "axios";

const client = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/v1/',
    timeout: 10000,
});

export default client;