import {api} from './api'

export const getMyNotification = (userId) => {
    return api.get(`${process.env.VUE_APP_API}/notification/all/${userId}`)
}

export const storeNotification = (payload) => {
    return api.post(`${process.env.VUE_APP_API}/notification/store`, payload)
}