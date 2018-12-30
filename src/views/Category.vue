<template>
  <div>
    <Header/>

    <v-container>
      <h1 class="pt-3 category">Category: {{$route.params.category}}</h1>

      <PostList :category="$route.params.category"/>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PostList from '@/components/PostList.vue';

@Component({
  components: {
    Footer,
    Header,
    PostList
  }
})
export default class Category extends Vue {}
</script>

<style>
</style>

