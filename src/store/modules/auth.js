import {
    AUTH
} from "@/store/action-types";

const state = {

}

const mutations = {

}

const actions = {
    [AUTH.LOGIN] (context, payload) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-unused-vars
            let data = payload;
            data = null
            // eslint-disable-next-line no-constant-condition
            if(true) {
                resolve({token: "abc"})
            }else {
                reject()
            }
        })
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
