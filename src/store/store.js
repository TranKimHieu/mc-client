import { createStore } from 'vuex'
import profile from './modules/profile';
import auth from './modules/auth'

export default createStore({
    modules: {
        profile,
        auth
    }
})
