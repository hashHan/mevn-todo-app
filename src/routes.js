import Vue from 'vue';
import VueRouter from 'vue-router';

//import auth from './store/modules/auth';

import Login from './components/auth/Login.vue';
import Signup from './components/auth/Signup.vue';
import Home from './components/Home.vue';
import Main from './components/Main.vue';

Vue.use(VueRouter)

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/login', name:'login', component: Login },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/main', name: 'main', component: Main },
    {path: '*', redirect: '/'}
];

export default new VueRouter({
    mode: 'history', 
    routes
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //       return savedPosition;
    //     }
    //     if(to.hash) {
    //         return {selector: to.hash };
    //     }else{
    //         return {x: 0, y: 0};
    //     }
    // }
})
