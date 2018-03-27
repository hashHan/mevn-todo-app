<template>
    <div id="todo" class="container">
      <!-- <div class="row">{{todolist}}</div> -->
      <div id="board" class="mx-auto row justify-content-center">
        <div class="btn btn-primary mb-5" @click="newpostclick=!newpostclick">New Post</div>
        <div id="list" class="col-12" v-if="!Edittoggle&&!newpostclick">
            <div class="card mb-5" v-for="eachtodo in todolist.slice().reverse()" :key="eachtodo._id">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold">{{eachtodo.text}}</h5>
                    <p class="card-text">
                        <span class="md-body-2 font-italic" v-if="eachtodo.completed">
                          Completed at : {{new Date(eachtodo.completedAt).toUTCString()}} 
                        </span>
                    </p>
                    <div class="btn btn-outline-info" 
                         @click="Completetoggle(eachtodo._id, eachtodo.completed)">
                      <span v-if="!eachtodo.completed" class="complete">To Complete</span>
                      <span v-if="eachtodo.completed" class="incomplete">To Incomplete</span>
                    </div>
                    <div class="btn btn-warning" @click="clickEdit(eachtodo._id, eachtodo.text)">Edit</div>
                    <div class="btn btn-danger" @click="Delete(eachtodo._id)">Delete</div>
                </div>     
            </div>
        </div>
        <div id="editor" class="col-12" v-if="Edittoggle||newpostclick">
          <div class="row" v-if="Edittoggle">
            <app-edit :id="selectedid" :temptext="selectedtext"></app-edit>
          </div>
          <div class="row" v-if="newpostclick">
            <div class="card bg-light border-secondary w-100">
                <div class="card-body">
                    <div class="card-title input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">New Text</span>
                        </div>
                        <input v-model="newtext" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="btn btn-success" @click="NEWPOST">SEND</div>
                    <div class="btn btn-danger" @click="cancelnew">CANCEL</div>
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
        newpostclick: false,
        newtext: ''
    };
  },
  computed: {
       ...mapGetters({
            todolist: 'gettodolist', //getter from state
            Edittoggle:'getEdittoggle',
            selectedid: 'getselectedid',
            selectedtext: 'getselectedtext'
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
    clickEdit(id, text){
      console.log(text);
      const argu = {id, text};
      this.$store.dispatch('changeEditandSelect', argu);
    },
    cancelnew(){
      this.newpostclick = false
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
#board{
  min-width:350px;
  max-width:700px;
}
.complete{
  color: red;
}
.incomplete{
  color: green;
}
</style>