<template>
  <div>
    Admin
    <hr>
    <nuxt-link :to="'/admin/new'">Yeni Ekle</nuxt-link>
    <h3>Yazılar</h3>
    <PostList isAdmin />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
export default {
  components: {
      PostList
  },
  middleware: ['check-auth', 'auth']
}
</script>