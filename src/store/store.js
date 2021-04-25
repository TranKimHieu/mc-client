import profile from './modules/profile';
import project from './modules/project';
import auth from './modules/auth'
import schedule from "@/store/modules/schedule";
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        profile,
        auth,
        schedule,
        project
    }
})
