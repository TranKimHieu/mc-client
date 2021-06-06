import {api} from './api'

export const getallUser = () => {
    return api.get(`${process.env.VUE_APP_API}/user/all`)
}