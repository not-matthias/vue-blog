<template>
  <div>
    <Header />

    <div align-center align="center">
      <h1 class="display-4 mt-5 pt-5">404</h1>
      <h2 class="display-1">Page not found.</h2>
    </div>

    <Footer />
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
