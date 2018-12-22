<template>
  <div>
    <Header/>

    <v-container>
      <h1>This is a single post.</h1>
      <p>Id: {{$route.params.id}}</p>

      <div v-html="html"></div>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import marked from 'marked';

// @ts-ignore
@Component({
  components: {
    Footer,
    Header
  }
})
export default class Post extends Vue {
  private html = marked('i am a ~~tast~~ **test**.');
}
</script>
