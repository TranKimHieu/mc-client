import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import * as _ from 'lodash'
import Page401 from "@/components/Page401";

const routes = [
    { path: '/', redirect: '/bar' },
    { path: '/bar', component: HelloWorld },
    { path: '/401', component: Page401}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

const pathPublic = ['/', '/login', '/401']
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const isPathPublic = _.includes(pathPublic, to.path)
    if(isPathPublic || ((!isPathPublic) && token)){
        next()
    }

    next('/401')
})



export default router
