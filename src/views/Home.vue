<template>
  <div>
    <Header/>

    <v-container>
      <h1>This is the homepage.</h1>
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
export default class Home extends Vue {}
</script>
