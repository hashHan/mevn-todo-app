<template>
  <div id="signup" class="container">
    <p>Signup  
    </p>
    <p v-if="loginemail">You logined, Your email address: {{ loginemail }}</p>
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$invalid}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p class="caution" v-if="!$v.email.email">Please provide a valid email address.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$invalid}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password">
          <p class="caution" v-if="!$v.password.minLen">A password must be at least 6 characters</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$invalid}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
          <p class="caution" v-if="$v.confirmPassword.$invalid">Please confirm your password</p>
        </div>
        <div class="input inline" :class="{invalid: $v.terms.$invalid}">
          <input 
                  type="checkbox" 
                  id="terms" 
                  @change="$v.terms.$touch()"
                  v-model="terms">
          <label for="terms">Accept Terms of Use</label>
           <p class="caution" v-if="$v.terms.$invalid">Please check Terms of Use</p>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid">Submit</button>
          <router-link to="/signin" class="btn">Go To Log In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs(vm => {
        return vm.password
      })
    },
    terms: {
      required
    },
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms
      };
      console.log(formData);
      this.$store.dispatch('signup', formData);
    }
  },
  computed: {
    loginemail () {
      return !this.$store.getters.isAuthenticated ? false : this.$store.getters.email
    }
  }
}
</script>

<style lang="scss" scoped>
  .input.invalid {
    p {
       color: red;
    }
  }

  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

 
  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>