<template>
  <div>
    <Header/>

    <v-container>
      <div class="category-card pl-4 pa-3 ma-4">
        <h1>Category: {{$route.params.category}}</h1>
      </div>

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
.category-card {
  background-color: white;
  border: 1px solid #ddd;
  border-left: 4px solid black;
}
</style>

