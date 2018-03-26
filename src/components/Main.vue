<template>
    <div id="appmain">
        main
        <app-todolist></app-todolist>
    </div>
</template>

<script>
import todolist from "./todo/Todolist.vue";
export default {
  name: 'appmain',
  data () {
    return {
    }
  },
  components: {
    appTodolist : todolist
  },

}
</script>

<style>

</style>