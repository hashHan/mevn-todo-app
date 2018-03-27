<template>
    <div id="home">
        <div class="mb-3">Welcome to Todo App! <br> Please Log In!</div>
        <div class = "container">
          <router-link to="/signin" class="btn btn-success">Log In</router-link>
          <router-link to="/signup" class="btn btn-primary">Sign Up</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }

}
</script>

<style>

</style>