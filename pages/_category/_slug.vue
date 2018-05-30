<template>
<div>
  <!-- <h1>slug {{ loadedPost.id }}</h1> -->
  <div v-for="post in loadedPost" :key="post.title"> 
  {{ post.author }}
  {{ post.title }}
  </div>
  </div>
</template>

<script>
import Vuex from "vuex"
import axios from "axios"

export default {
  data() {
    return {
      loadedPost: []
    }
  },
  async asyncData({params}) {
    return axios.get('https://howto-a9089.firebaseio.com/posts.json?orderBy="slug"&equalTo=' + '"' + params.slug + '"' + '&print=pretty')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })
      // .catch(e => context.error(e))
  },
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
