import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API,
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export const setApiToken = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};