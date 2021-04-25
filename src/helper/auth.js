import {setApiToken} from "../services/api";

export const authCheck = () => {
    const token = localStorage.getItem('token')
    return !!(token)
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
    setApiToken(token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}
