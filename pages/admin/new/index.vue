<template>
  <AdminPostForm />
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  components: {
      AdminPostForm
  },
  middleware: ['check-auth', 'auth']
}
</script>
