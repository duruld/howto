<template>
<div>
  <!-- <h1>slug {{ loadedPost.id }}</h1> -->
  <div key="loadedPost.title"> 
  {{ loadedPost.author }}
  {{ loadedPost.title }}
  </div>
  </div>
</template>

<script>
import Vuex from "vuex"
import axios from "axios"

export default {
  data() {
    return {
      loadedPost: {}
    }
  },
  async asyncData({app, params}) {
    const obj = await app.$axios.$get('https://howto-a9089.firebaseio.com/posts.json?orderBy="slug"&equalTo=' + '"' + params.slug + '"' + '&print=pretty');
    const id = Object.keys(obj)[0];
    const loadedPost = obj[id];
    return {
      loadedPost
    };
  },
    head() {
      return {
        title: this.loadedPost.title,
      }
    } 
  }
 
</script>
