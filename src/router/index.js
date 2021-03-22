import * as _ from 'lodash'
import Page401 from "@/views/error/Page401";
import Page404 from "@/views/error/Page404";
import {authCheck} from "@/helper/auth";
import Login from "@/views/auth/Login";
import Vue from 'vue'
import VueRouter from 'vue-router'
import Schedule from "@/views/Schedule";
import Master from "@/views/Master";
import Company from "@/views/Company";
import Overview from "@/views/Overview";
import Member from "@/views/People";

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/admin' },
    {path: '/admin', component: Master, name: 'master',
        children: [
            { path: '/', component: Schedule },
            { path: 'schedule', component: Schedule, name: 'schedule', meta: { requiresAuth: true } },
            { path: 'overview', component: Overview, name: 'overview', meta: { requiresAuth: true } },
            { path: 'company', component: Company, name: 'company', meta: { requiresAuth: true } },
            { path: 'login', component: Login , name: 'login', meta: { requiresAuth: false } },
            { path: 'Member', component: Member, name: 'member', meta: { requiresAuth: true } }
        ]
    },
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
            next({ name: 'schedule' })
        }else {
            next()
        }

    }

})



export default router
