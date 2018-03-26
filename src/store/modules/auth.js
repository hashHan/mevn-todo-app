import axios from '../../axios-auth' // for authenication

const state = {
    idToken: null,
    userId: null,
    email: null,
    user: null
};
const mutations= {
    authUser (state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
      state.email = userData.email;
    },
    storeUser (state, user) { //save to state // do not use, related to fetchUser
        state.user = user;
    },
    clearAuthData (state) {
        state.idToken = null
        state.userId = null
    }
};
const actions = {
    signup ({commit, dispatch}, authData) { // signup ({commit, dispatch}, authData) {
        axios.post('/users', {// to authentication
            email: authData.email,
            password: authData.password
            })
            .then(res => {
                console.log(res.headers.expiresin);
                commit('authUser', { //to state
                    token: res.headers['x-auth'],
                    userId: res.data._id,
                    email: res.data.email
                });
                const now = new Date();
                const expiresin = parseInt(res.headers.expiresin);
                console.log(expiresin);
                const expirationDate = new Date(now.getTime() + expiresin * 1000);
                console.log(expirationDate);
                localStorage.setItem('token', res.headers['x-auth']);
                localStorage.setItem('userId', res.data._id);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch('setLogoutTimer', expiresin);
                // dispatch('storeUser', authData); // to database
            })
            .catch(function (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                if (error.response.data.code === 11000) {
                    console.log('The email is already in use.');
                    alert('The email is already in use.');
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('otherError', error.message);
              }
              console.log(error.config);
            });
    },
    login ({commit, dispatch}, authData) {
        axios.post('/users/login', {
            email: authData.email,
            password: authData.password
            })
            .then(res => {
                console.log(res.headers.expiresin);
                commit('authUser', { //to state
                    token: res.headers['x-auth'],
                    userId: res.data._id,
                    email: res.data.email
                });
                const now = new Date();
                const expiresin = parseInt(res.headers.expiresin);
                console.log(expiresin);
                const expirationDate = new Date(now.getTime() + expiresin * 1000);
                console.log(expirationDate);
                localStorage.setItem('token', res.headers['x-auth']);
                localStorage.setItem('userId', res.data._id);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch('setLogoutTimer', expiresin);
            })
            .catch(error => console.log(error));
    },
    tryAutoLogin ({commit}) {
        const token = localStorage.getItem('token')
        if (!token) {
          return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
          return
        }
        const userId = localStorage.getItem('userId')
        commit('authUser', {
          token: token,
          userId: userId
        })
    },
    setLogoutTimer ({commit}, expirationTime) {
        setTimeout(() => {
          commit('clearAuthData')
        }, expirationTime * 1000)
    },
    logout ({commit}) {
        commit('clearAuthData')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/Signin')
    },
};

const getters= {
    email (state) {
      return state.email
    },
    isAuthenticated (state) {
        return state.idToken !== null
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};