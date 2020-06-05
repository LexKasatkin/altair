import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../components/Main";
import Company from "../components/Company";

Vue.use(VueRouter)

const routes = [
    {
        path: '/main',
        component: Main
    },
    {
        path: '/company',
        component: Company
    },
    {
        path: '*',
        component: Main
    },
]

const router = new VueRouter({
    routes
})

export default router
