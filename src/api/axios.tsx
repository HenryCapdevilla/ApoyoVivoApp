import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Carga la URL desde .env
    withCredentials: true // Permitir el envío de cookies
});

export default instance;
