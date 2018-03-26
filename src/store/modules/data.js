import axios from '../../axios' // for database

import auth from './auth'// for authentication

const state = {
    fetchedportfolios: [],
    fetchedposts: []
};

const mutations = {
    storePosts (state, posts) { //save to state 
        state.fetchedposts = posts;
        console.log(state.fetchedposts);
    },
    storePortfolios (state, portfolios) { //save to state 
        state.fetchedportfolios = portfolios;
        console.log(state.fetchedportfolios);
    }
};

const actions = {
    fetchAllPosts ({commit}) { //({commit, auth.state}) state is for extract current idToken
        // if (!auth.state.idToken) { // due to database read rules auth != null
        //   return
        // }
        //globalAxios.get('/posts.json' + '?auth=' + state.idToken) //for authenticated reader
        globalAxios.get('/posts.json')
          .then(res => {
            console.log(res)//res is object
            const postsobject = res.data
            console.log(postsobject)//res.data is also object
            const posts = []
            for (let key in postsobject) {// keys are randomly allocated by the firebase 'POST' method 
            const eachpostobject = postsobject[key]
            eachpostobject.id = key // decline keys into each post object 
            posts.push(eachpostobject) // make posts array by push each post object
            }
            console.log(posts)
            commit('storePosts', posts) // mutation-storeUser fetch datas to store objects
          })
          .catch(error => console.log(error))
    },
    fetchAllPortfolios ({commit}) { //({commit, auth.state}) state is for extract current idToken
        // if (!auth.state.idToken) { // due to database read rules auth != null
        //   return
        // }
        //globalAxios.get('/portfolios.json' + '?auth=' + state.idToken) //for authenticated reader
        globalAxios.get('/portfolios.json')
          .then(res => {
            console.log(res)//res is object
            const portfoliosobject = res.data
            console.log(portfoliosobject)//res.data is also object
            const portfolios = []
            for (let key in portfoliosobject) {// keys are randomly allocated by the firebase 'POST' method 
            const eachportfolioobject = portfoliosobject[key]
            eachportfolioobject.id = key // decline keys into each portfolio object 
            portfolios.push(eachportfolioobject) // make portfolios array by push each portfolio object
            }
            console.log(portfolios)
            commit('storePortfolios', portfolios) // mutation-storeUser fetch datas to store objects
          })
          .catch(error => console.log(error))
    },

    // below two function is made to set first time. Do not use.
    storeallposts ({commit, state}) { // send all posts in state to database 
        if (!auth.state.idToken) {// for authenticated writing
          return
        };
        console.log(state.posts);
        for (let post of state.posts){ 
            globalAxios.post('/posts.json' + '?auth=' + auth.state.idToken, post)
            .then(res => console.log(res))
            .catch(error => console.log(error))
        }

    },
    storeallportfolios ({commit, state}) { // send all portfolios to database 
        if (!auth.state.idToken) {// for authenticated writing
          return
        };
        console.log(state.portfolios);
        for (let portfolio of state.portfolios){ 
            globalAxios.post('/portfolios.json' + '?auth=' + auth.state.idToken, portfolio)
            .then(res => console.log(res))
            .catch(error => console.log(error))
        }
    }
};

const getters = {
    getportfolios: state => {
        return state.portfolios;
    },
    getposts: state => {
        return state.posts;
    },
    getfetchedportfolios: state => {
        return state.fetchedportfolios;
    },
    getfetchedposts: state => {
        return state.fetchedposts;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};