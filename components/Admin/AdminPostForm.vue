<template>
  <section>
      <form @submit.prevent="onSave">
          <input type="text" v-model="editedPost.title" placeholder="Başlık"> <br>
            <div class="step" v-for="(steps, index) in editedPost.steps" :key="steps.id">
                <input type="text" v-model="steps.title" placeholder="Adım 1">
                <input type="text" v-model="steps.desc" placeholder="Adım açıklama">
                <input type="text" v-model="steps.file">
                <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
            </div>
            <a @click="addRow">Adım Ekle</a>
            <p>Meta</p>
            <div class="meta">
                <input type="text" placeholder="Meta desc" v-model="editedPost.meta.descripton">
                <input type="text" placeholder="Meta desc" v-model="editedPost.meta.keywords">
            </div>
          <input type="text" v-model="editedPost.author" placeholder="Yazar">
          <button>Gönder</button>
          <br>
          {{ editedPost.steps }} <br>
          {{ editedPost.meta }}
      </form>
  </section>
</template>


<script>
import axios from 'axios'

export default {
  data() {
      return {
          editedPost: this.post ? { ...this.post } : {
              title: '',
              steps: [{ "id": "1"}],
              author: '',
              slug: '',
              meta: {}

          }
      }
  },
  props: {
      post: {
          type: Object,
          required: false
      }
  },
  methods: {
        onSave(editedPost) {
            console.log(this.editedPost)
            axios.post('https://howto-a9089.firebaseio.com/posts.json', this.editedPost)
                 .then(result => console.log(result))
                 .catch(e => console.log(e))
        },
        addRow: function() {
            this.editedPost.steps.push({
                id: this.editedPost.steps.length + 1,
                title: '',
                desc: '',
                file: ''
            });
        },
        removeElement: function(index) {
            this.editedPost.step.splice(index, 1);
        }
  }
}
</script>
