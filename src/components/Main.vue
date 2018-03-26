<template>
    <div id="appmain">
        main
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