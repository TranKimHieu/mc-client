import axios from "axios";
import {Message} from 'element-ui'
const api = axios.create({
    baseURL: process.env.API,
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

api.interceptors.request.use(
    config => {
        // Do something before request is sent
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        switch (error.response.status) {
            case 401:
                localStorage.removeItem('token')
                this.$router.push({name: 'login'})
                break;
        }
        Message({
            message: error.response.data.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error);
    }
)

export {api}
