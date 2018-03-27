<template>
    <div id="Edit" class="card bg-light border-secondary w-100">
        <div class="card-body">
            <div class="card-title input-group mb-3 justify-content-center">
                <h5>{{temptext}}</h5>
            </div>
            <div class="card-text">
              <div class="input-group-prepend mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">Edited Text</span>
                  
                  <input v-model="editedtext" type="text" class="form-control" 
                        aria-label="Default" aria-describedby="inputGroup-sizing-default">
              </div>
              <div class="btn btn-success" @click="Editcontent(id, editedtext)">SEND</div>
              <div class="btn btn-danger" @click="canceledit">CANCEL</div>
            </div>      
        </div>
    </div>
</template>

<script>
import router from '../../routes';

export default {
  props: ["id", "temptext"],
  name: "edit",
  data() {
    return {
      editedtext: ''
    };
  },
  computed: {

  },
  methods: {
    Editcontent(eachid, eachtext){
      console.log(eachid, eachtext);
      this.$store.dispatch('patchtodo',{_id: eachid, text: eachtext});
      this.$store.dispatch('changeEditandSelect');
      //router.push({path: '/appmain'})
    },
    canceledit(){
      this.$store.dispatch('changeEditToggle');
    }
  }
};
</script>

<style>

</style>