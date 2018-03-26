<template>
    <div id="Edit">
      <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <div class="card-title input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Edit Text</span>
                        </div>
                        <input v-model="editedtext" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="btn btn-primary" @click="Editcontent(id, editedtext)">SEND</div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import router from '../../routes';

export default {
  props: ["id"],
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
      this.$store.dispatch('changeEditToggle');
      //router.push({path: '/appmain'})
    },
  }
};
</script>

<style>

</style>