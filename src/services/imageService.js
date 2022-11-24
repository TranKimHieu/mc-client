import {api} from './api'

export const getImageInTask = (taskId) => {
    return api.get(`${process.env.VUE_APP_API}/image/list/${taskId}`)
}

export const storeImage = (image) => {
    return api.post(`${process.env.VUE_APP_API}/image/store`, image)
}