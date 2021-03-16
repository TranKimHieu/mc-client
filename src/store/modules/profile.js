import {
ADD_USER
} from "@/store/muation-types";

const state = {
    data: {
        username: null,
        fullName: null,
    }
}

const mutations = {
    [ADD_USER] (state, profile) {
        state.data = {...state.me, ...profile}
    }
}

const actions = {
}


export default {
    state,
    mutations,
    actions
}
