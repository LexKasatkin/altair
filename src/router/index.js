import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../components/Main";
import Company from "../components/Company";
import Flats from "../components/Flats";
import FlatDetails from "../components/FlatDetails";

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
        path: '/flats',
        component: Flats
    },
    {
        path: '/flat/:id',
        name: 'flatDetails',
        component: FlatDetails
    },
    {
        path: '*',
        component: Main
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
