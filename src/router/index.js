import * as _ from 'lodash'
import Page401 from "@/components/Page401";
import Page404 from "@/components/Page404";
import {authCheck} from "@/helper/auth";
import Login from "@/components/auth/Login";
import Home from "@/components/Home";
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login , name: 'login', meta: { requiresAuth: false } },
    { path: '/home', component: Home, name: 'home', meta: { requiresAuth: true } },
    { path: '/401', component: Page401, meta: { requiresAuth: false } },
    { path: '/404', component: Page404, meta: { requiresAuth: false } },
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    const pathBeforeLogin = ['/login']
    if (to.matched.length === 0) {
        next('/404')
    }
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!authCheck()){
            next({ name: 'login' })
        }else{
            next()
        }
    }else{
        if(_.includes(pathBeforeLogin, to.path) && authCheck()) {
            next({ name: 'home' })
        }else {
            next()
        }

    }

})



export default router
