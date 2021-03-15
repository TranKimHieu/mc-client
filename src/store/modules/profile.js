import {
ADD_USER
} from "@/store/muation-types";

const state = {
    me: {
        name: null
    }
}

const mutations = {
    [ADD_USER] (state, profile) {
        state.me = {...state.me, ...profile}
    }
}

export default {
    state,
    mutations,
}
