<template>
  <section>
      <form @submit.prevent="login">
          <input type="text" placeholder="E-mail"> <br>
          <input type="password" placeholder="Password">
          <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
          <button @click="isLogin = !isLogin">Switch to {{ isLogin ? 'SignUp' : 'Login' }}</button>
      </form>
  </section>
</template>

<script>
export default {
    name: 'adminAuth',
    data() {
        return {
            isLogin: true
        }
    }
}
</script>
