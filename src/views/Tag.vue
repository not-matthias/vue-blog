<template>
  <div>
    <Header/>

    <v-container>
      <div class="tag-card pl-4 pa-3 ma-4">
        <h1>Tag: {{$route.params.tag}}</h1>
      </div>

      <PostList :tag="$route.params.tag"/>
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
.tag-card {
  background-color: white;
  border: 1px solid #ddd;
  border-left: 4px solid black;
}
</style>

