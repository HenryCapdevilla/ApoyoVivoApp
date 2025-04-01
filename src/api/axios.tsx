import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.VITE_AXIOS_BACKED}/auth`, // Carga la URL desde .env
    withCredentials: true // Permitir el envío de cookies
});

export default instance;