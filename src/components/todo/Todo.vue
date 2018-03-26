<template>
    <div id="todo">
      <div class="row">{{todolist}}</div>
      <div class="btn btn-primary" @click="newpostclick=!newpostclick">New Post</div>
      <div class="row">
        <div class="col-sm-6">
            <div class="card" v-for="eachtodo in todolist" :key="eachtodo._id">
                <div class="card-body">
                    <h5 class="card-title">{{eachtodo.text}}</h5>
                    <p class="card-text">
                        <span class="md-body-2" v-if="eachtodo.completed">Completed at : {{new Date(eachtodo.completedAt).toUTCString()}} </span>
                    </p>
                    <div class="btn btn-primary" @click="Completetoggle(eachtodo._id, eachtodo.completed)">
                      <span v-if="!eachtodo.completed">To Complete</span>
                      <span v-if="eachtodo.completed">To Incomplete</span>
                    </div>
                    <div class="btn btn-primary" @click="Delete(eachtodo._id)">Delete</div>
                    <div class="btn btn-primary" @click="clickEdit(eachtodo._id)">Edit</div>
                    <!-- <router-link to="/edit" class="btn btn-primary" :eachtodo="eachtodo">EDIT</router-link> -->
                </div>     
            </div>
        </div>
        <div class="col-sm-6">
          <div class="row" v-if="editclick">
            <app-edit :id="id"></app-edit>
          </div>
          <div class="row" v-if="newpostclick">
            <div class="card">
                <div class="card-body">
                    <div class="card-title input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Text</span>
                        </div>
                        <input v-model="newtext" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="btn btn-primary" @click="NEWPOST">SEND</div>
                </div>
            </div>
          </div>
        </div>
    
    
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Edit from './Edit.vue';

export default {
  name: "todo",
  data() {
    return {
        id: '',
        newpostclick: false,
        newtext: ''
    };
  },
  computed: {
       ...mapGetters({
            todolist: 'gettodolist', //getter from state
            editclick:'getEdittoggle'
       })  
  },
  methods: {
    NEWPOST(){
      console.log(this.newtext);
      const textObj = {text: this.newtext};
      this.$store.dispatch('posttodo', textObj);
      this.newpostclick = !this.newpostclick;
    },
    Delete(eachid){
      console.log(eachid);
      this.$store.dispatch('deletetodo', eachid);
    },
    Completetoggle(eachid, eachcompleted){
      console.log(eachid, eachcompleted)
      this.$store.dispatch('patchtodo',{_id: eachid, completed: !eachcompleted}) ;
    },
    clickEdit(id){
      this.$store.dispatch('changeEditToggle');
      this.id = id;
    }
  },
  created () {
      this.$store.dispatch('gettodo') ; // get from db to state
  },
  components:{
    appEdit: Edit
  }
};
</script>

<style>

</style>