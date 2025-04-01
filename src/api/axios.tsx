import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth', // Carga la URL desde .env
    withCredentials: true // Permitir el envío de cookies
});

export default instance;
