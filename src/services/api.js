import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API,
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});
