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
          loadedPosts: {
              isAdmin: true,
              id: '1',
              title: 'Nasıl Yapılır 1',
              slug: 'nasil-yapilir',
              kategori: 'teknoloji',
              author: 'Oguzcan Kose',
              file: '',
              steps: {
                  title: 'adim 1',
                  descripton: 'açıklama 1'
              },
              meta: {
                  name: 'Meta name',
                  content: 'meta desc',
                  keywords: 'meta keyword'
              }
          }
      }
  }
}
</script>
