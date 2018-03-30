<template>
    <div id="home">
        <div v-if="!auth" class="mb-3">Welcome to Todo App! <br> Please Log In!</div>
        <div v-if="!auth" class = "container">
          <router-link to="/signin" class="btn btn-success">Log In</router-link>
          <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
        </div>
        <div v-if="auth" class="mb-3">Welcome to Todo App! <br> Please write your todo!</div>
        <div v-if="auth" class = "container">
          <router-link to="/appmain" class="btn btn-success">Todo</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    auth () {
        return this.$store.getters.isAuthenticated
    }
  },

}
</script>

<style>

</style>