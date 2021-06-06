import {api} from './api'

export const getallUser = () => {
    return api.get(`${process.env.VUE_APP_API}/user/all`)
}

export const getUserInProject = (projectId) => {
    return api.get((`${process.env.VUE_APP_API}/user/user-in-project/${projectId}`))
}

export const storeMember = (payload) => {
    return api.post(`${process.env.VUE_APP_API}/user/store-user`, payload)
}