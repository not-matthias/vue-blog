<template>
  <div>
    <Header/>

    <v-container text-xs-center>
      <h1 class="display-4 mt-5">404</h1>
      <h2 class="display-1">Page not found.</h2>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Category extends Vue {}
</script>

