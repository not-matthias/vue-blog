<template>
  <div>
    <Header />

    <v-container>
      <!-- TODO:  Design here -->
    </v-container>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Author extends Vue {}
</script>
