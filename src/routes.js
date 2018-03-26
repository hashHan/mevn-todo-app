import Vue from 'vue';
import VueRouter from 'vue-router';

//import auth from './store/modules/auth';

import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import Home from './components/Home.vue';
import appmain from './components/Main.vue';
import Todolist from './components/todo/Todolist.vue';

Vue.use(VueRouter)

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/signin', name:'signin', component: Signin },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/appmain', name: 'appmain', component: appmain },
    { path: '/todolist', name: 'todolist', component: Todolist },
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
