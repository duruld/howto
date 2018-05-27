<template>
  <AdminPostForm :post="loadedPosts"/>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  components: {
      AdminPostForm
  },
  data() {
      return {
          
      }
  }
}
</script>
