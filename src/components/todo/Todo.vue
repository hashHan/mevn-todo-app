<template>
    <div id="todo">
      <div class="row">
        <div class="col-sm-6">
            <div class="card" v-if="!editMode">
                <div class="card-body">
                    <h5 class="card-title">{{todoData.text}}</h5>
                    <p class="card-text">
                        <span class="md-body-2" v-if="todoData.completed">Completed at : {{new Date(todoData.completedAt).toUTCString()}} </span>
                    </p>
                    <div class="btn btn-primary" @click="Edit">Edit</div>
                    <div class="btn btn-primary" @click="Complete">Complete</div>
                    <div class="btn btn-primary" @click="Incomplete">Incomplete</div>
                    <div class="btn btn-primary" @click="Delete">Delete</div>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="card" v-if="editMode">
                <div class="card-body">
                    <div class="card-title input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Edit</span>
                        </div>
                        <input v-model="todoData.text" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <p class="card-text">
                        <span class="md-body-2" v-if="todoData.completed">Completed at : {{new Date(todoData.completedAt).toUTCString()}} </span>
                    </p>
                    <div class="btn btn-primary" @click="Edit">Edit</div>
                    <div class="btn btn-primary" @click="Complete" v-if="!todoData.completed">Complete</div>
                    <div class="btn btn-primary" @click="Incomplete" v-if="todoData.completed">Incomplete</div>
                    <div class="btn btn-primary" @click="Delete">Delete</div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ["todoData"],
  name: "todo",
  data() {
    return {
      completed: false,
      editMode: false,
      tempText: this.todoData.text
    };
  },
  methods: {
    Delete: function() {
      this.$store.dispatch('delete', formData);      


      this.$http
        .delete(`todos/${this.todoData._id}`, {
          headers: { "x-auth": this.$cookie.get("x-auth") }
        })
        .then(
          res => {
            this.$emit("todoDeleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    Complete: function() {
      this.$http
        .patch(
          `todos/${this.todoData._id}`,
          { completed: true },
          {
            headers: { "x-auth": this.$cookie.get("x-auth") }
          }
        )
        .then(
          res => {
            this.$emit("todoCompleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    Incomplete: function() {
      this.$http
        .patch(
          `todos/${this.todoData._id}`,
          { completed: false },
          {
            headers: { "x-auth": this.$cookie.get("x-auth") }
          }
        )
        .then(
          res => {
            this.$emit("todoIncompleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    Edit: function() {
      this.editMode = !this.editMode;
      if (!this.editMode) {
        this.$http
          .patch(
            `todos/${this.todoData._id}`,
            { text: this.todoData.text },
            {
              headers: { "x-auth": this.$cookie.get("x-auth") }
            }
          )
          .then(
            res => {
              this.tempText;
            },
            err => {
              console.log(err);
            }
          );
      }
    }
  }
};
</script>

<style>

</style>