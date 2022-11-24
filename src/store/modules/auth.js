import {
    AUTH
} from "@/store/action-types";
import {api} from "../../services/api";

const state = {

}

const mutations = {

}

const actions = {
    [AUTH.LOGIN] (context, payload) {
        return api.post(`${process.env.VUE_APP_API}/auth/login`, payload)
    },
    [AUTH.LOGOUT] () {
        return new Promise((resolve) => {
            resolve()
        })
    }
}


export default {
    state,
    mutations,
    actions
}
