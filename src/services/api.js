import {API} from "@/config";
import axios from "axios";

export const api = axios.create({
    baseURL: API,
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});
