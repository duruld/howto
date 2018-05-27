<template>
    <div>
        <!-- <nuxt-link :to="postLink"> -->
        <nuxt-link :to="{name: 'category-slug', params: { slug: slug, id: id, category: category } }">
            <article>
                <p>{{title}}</p>
                <!-- <p>{{stepCount}}</p> -->
            </article>
        </nuxt-link>
        <ul>
            <li v-for="step in steps" :key="step.title">
                <p>{{step.title}}</p>
                <p>{{step.desc}}</p>
                <p>{{step.file}}</p>
            
            </li>
        </ul>
    {{slug}}
    </div>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
      id: {
          type: String,
          required: true
      },
      title: {
          type: String,
          required: true
      },
      steps: {
          type: Array,
          required: true
      },
      category: {
          type: String,
          required: true
      },
      isAdmin: {
          type: Boolean,
          required: true
      },
      author: {
          type: String,
          required: true
      },
      meta: {
          type: Object,
          required: true
      },
      slug: {
          type: String,
          required: true
      }
  },
  computed: {
      postLink() {
          return this.isAdmin ? '/admin/' + this.slug : '/post/' + this.slug
      }
  }
}
</script>
