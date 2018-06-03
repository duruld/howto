<template>
  <section>
      <form @submit.prevent="onSubmit">
          <input type="text" placeholder="E-mail" v-model="email"> <br>
          <input type="password" placeholder="Password" v-model="password">
          <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>
          <button @click="isLogin = !isLogin">Switch to {{ isLogin ? 'SignUp' : 'Login' }}</button>
  </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'adminAuth',
    data() {
        return {
            isLogin: true,
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('authenticateUser', {
                isLogin: this.isLogin,
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push('/admin/new')
            })
        }
    }
}
</script>