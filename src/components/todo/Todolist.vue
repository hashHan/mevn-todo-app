<template>
  <div name="todolist">
    <div class="btn btn-primary" @click="gettodolist">gettodo</div>
    <div>{{todolist}}</div>
    <div class="btn btn-primary" @click="posttodolist">posttodo</div>
    <div class="btn btn-primary" @click="deletetodolist">deletetodo</div>
    <div class="btn btn-primary" @click="patchtodolist">patchtodo</div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import todo from './Todo.vue';


export default {
  data(){
    return {
      newpost:{text: "from Todolist.vue"}
    } 
  },
  computed: {
       ...mapGetters({
            todolist: 'gettodolist' //getter
       })
  },
  methods: {
    selectThis(val, index) {
      this.showIndex = index;
    },
    gettodolist(){
      this.$store.dispatch('gettodo') ;
    },
    posttodolist(){
      console.log(this.newpost);
      this.$store.dispatch('posttodo', this.newpost) ;
      
    },
    deletetodolist(){
      this.$store.dispatch('deletetodo', this.todolist[0]._id) ;
      // console.log(this.todolist[0]._id)
    },
    patchtodolist(){
      console.log(this.patchdata)
      this.$store.dispatch('patchtodo',{_id: this.todolist[0]._id, text: 'patched text', completed: true}) ;
      
    }
  },
  components:{
    apptodo: todo
  },
  created () {
      // GET request action
  }
}
</script>