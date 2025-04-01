import axios from 'axios';

const instance = axios.create({
    baseURL: `${import.meta.env.AXIOS_BACKEND}/auth`, // Carga la URL desde .env
    withCredentials: true // Permitir el envío de cookies
});

export default instance;
