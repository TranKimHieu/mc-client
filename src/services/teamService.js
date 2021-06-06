
import {api} from './api'

export const getTeamInProject = (projectId) => {
    return api.get((`${process.env.VUE_APP_API}/team/team-in-project/${projectId}`))
}

export const storeTeam = (payload) => {
    return api.post(`${process.env.VUE_APP_API}/team/store`, payload)
}