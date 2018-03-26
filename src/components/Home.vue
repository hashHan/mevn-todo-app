<template>
    <div id="home">
        <span>Todo Application with MEVN</span>
        <div class = "container">
          <router-link to="/signin" class="btn btn-primary">Log In</router-link>
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