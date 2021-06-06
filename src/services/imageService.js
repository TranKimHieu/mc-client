import {api} from './api'

export const getImageInTask = (taskId) => {
    return api.get(`${process.env.VUE_APP_API}/image/list/${taskId}`)
}
