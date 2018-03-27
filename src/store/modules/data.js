import axios from '../../axios-auth'  // for database
import auth from './auth'// for authentication

const state = {
    todolist: [],
    edittoggle: false,
    selectedid: '',
    selectedtext: ''
};

const mutations = {
    storetodos (state, todos) { //save to state 
        state.todolist = todos;
        console.log(state.todolist);
    },
    storeEditToggle (state) { //save to state 
        state.edittoggle = !state.edittoggle;
    },
    storeselected (state, arg){
        state.selectedid = arg.id;
        state.selectedtext = arg.text;
        console.log(state.selectedid, state.selectedtext );
    }
};

const actions = {
    //edit toggle
    changeEditandSelect({commit}, arg) {
        commit('storeEditToggle');
        commit('storeselected', arg);
    },

    changeEditToggle({commit}) {
        commit('storeEditToggle');
    },


    //POST /todos
    posttodo({commit, dispatch}, postdata) {//dispatch: fetch new todolist data
        if (!auth.state.idToken) {// for authenticated writing
            return console.log('a token does not exist');
        }
        axios.post('/todos', 
                {text: postdata.text}, 
                {headers: {'x-auth': auth.state.idToken}}
            )
            .then(res => {
                console.log(res);
                dispatch('gettodo');
            })
            .catch(error => console.log(error));
    },
    //GET /todos
    gettodo({commit}) {
        if (!auth.state.idToken) {// for authenticated writing
            return console.log('a token does not exist');
        }
        axios.get('/todos', {headers: {'x-auth': auth.state.idToken}})
            .then(res => {
                console.log(res);
                console.log(res.data.todos);
                commit('storetodos', res.data.todos);
            })
            .catch(error => console.log(error));
    },
    //GET /todos/:id
    gettodoid({commit, dispatch}, itemid) {
        if (!auth.state.idToken) {// for authenticated writing
            return console.log('a token does not exist');
        }

        axios.get('/todos/'+itemid,{ 
                headers: {'x-auth': auth.state.idToken}
            })
            .then(res => {
                console.log(res);
                //console.log(res.data.todos);
                //dispatch('gettodo');
            })
            .catch(error => console.log(error));
    },
    //DELETE /todos/:id
    deletetodo({commit, dispatch}, itemid) {
        if (!auth.state.idToken) {// for authenticated writing
            return console.log('a token does not exist');
        }

        axios.delete('/todos/'+itemid,{ 
                headers: {'x-auth': auth.state.idToken}
            })
            .then(res => {
                console.log(res);
                //console.log(res.data.todos);
                dispatch('gettodo');
            })
            .catch(error => console.log(error));
    },
    //PATCH /todos/:id
    patchtodo({commit, dispatch}, iteminfo) {
        if (!auth.state.idToken) {// for authenticated writing
            return console.log('a token does not exist');
        }
        axios.patch('/todos/'+iteminfo._id,iteminfo,{ 
                headers: {'x-auth': auth.state.idToken}
            })
            .then(res => {
                console.log(res);
                //console.log(res.data.todos);
                dispatch('gettodo');
            })
            .catch(error => console.log(error));
    }

  
};

const getters = {
    gettodolist: state => {
        return state.todolist;
    },
    getEdittoggle: state => {
        return state.edittoggle;
    },
    getselectedid: state => {
        return state.selectedid;
    },
    getselectedtext: state => {
        return state.selectedtext;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};