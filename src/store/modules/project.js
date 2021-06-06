import {
    PROJECT
} from "@/store/action-types";
import {
    MT_PROJECT
} from "@/store/mutation-types";
import {api} from "../../services/api";

const state = {
    data: {

    }
}

const mutations = {
    [MT_PROJECT.ADD] (state, project) {
        state.data = project
        localStorage.setItem('current-project', JSON.stringify(project))
    }
}

const actions = {
    [PROJECT.MY_PROJECT] () {
        return api.get(`${process.env.VUE_APP_API}/my-project`)
    }
}


export default {
    state,
    mutations,
    actions
}
