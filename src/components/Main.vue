<template>
    <div id="appmain">
        <div class="mb-3 font-weight-bold">Manage your todo list!</div>
        <app-todo></app-todo>
    </div>
</template>

<script>
import todo from './todo/Todo.vue';

export default {
  name: 'appmain',
  data () {
    return {
    }
  },
  components:{
    appTodo: todo
  }

}
</script>

<style>

</style>