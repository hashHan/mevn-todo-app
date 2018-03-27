<template>
   <div id="app" class="container"> 
      <ul class="nav justify-content-between font-weight-bold mb-5">
        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" target="_blank" href="https://bloghaeseong.firebaseapp.com/">My Blog</a>
        </li>
        <li v-if="auth" class="nav-item">
          <a @click="onLogout" class="nav-link" href="#">LOGOUT</a>
        </li>
      </ul>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      //
    }
  },
  computed: {
    auth () {
        return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss">
.slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-30px);
        opacity: 0;
    }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
