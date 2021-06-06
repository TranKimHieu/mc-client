import {api} from './api'

export const getTaskInProject = (projectId) => {
    return api.get(`${process.env.VUE_APP_API}/task/list/${projectId}`)
}

export const storeTask = (payload) => {
    return api.post(`${process.env.VUE_APP_API}/task/store`, payload)
}

export const getTaskChildren = (parentId) => {
    return api.get(`${process.env.VUE_APP_API}/task/list-children/${parentId}`)
}

export const getTaskParent = (projectId) => {
    return api.get(`${process.env.VUE_APP_API}/task/list-parent/${projectId}`)
}