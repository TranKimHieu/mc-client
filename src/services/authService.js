import {api} from '@/services/api'

export const login = (username, password) => {
    return api.post(this.getUrl(), {username, password})
}
