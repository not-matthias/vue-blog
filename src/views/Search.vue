<template>
  <div>
    <Header/>

    <v-container>
      <v-text-field v-model="search" label="Search"></v-text-field>
      <PostList :search="search"/>
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
export default class Search extends Vue {
  private search: string = '';
}
</script>
