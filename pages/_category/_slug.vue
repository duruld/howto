<template>
<div>
  <h1>slug {{ $route.params.id }}</h1>
  {{ loadedPost.author }}
  </div>
</template>

<script>
import Vuex from "vuex"
import axios from "axios"

export default {
  // data() {
  //   return {
  //     loadedPost: []
  //   }
  // },
  asyncData(context) {
    return axios.get('https://howto-a9089.firebaseio.com/posts/' + context.params.id + '.json')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })
      // .catch(e => context.error(e))
  },
  // computed: {
  //   post() {
  //       return this.$store.state.post
  //   },  
    // head() {
    //   return {
    //     title: loadedPost.title,
    //     meta: [
    //       {
    //         hid: `description`,
    //         name: 'description',
    //         content: loadedPost.meta.descripton
    //       },
    //       {
    //         hid: `keywords`,
    //         name: 'keywords',
    //         keywords: loadedPost.meta.keywords
    //       }
    //     ]
    //   }
    // } 
  }
 
</script>
