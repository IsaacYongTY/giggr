import axios from 'axios';
import { parseCookies } from 'nookies';
axios.interceptors.request.use(
    (config) => {
        const cookies = parseCookies();
        config.headers['x-auth-token'] = cookies['x-auth-token'];
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;
