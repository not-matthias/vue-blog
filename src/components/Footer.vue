<template>
  <div class="mt-5 pt-5">
    <v-footer absolute dark>
      <v-spacer></v-spacer>
      <div>Copyright {{ new Date().getFullYear() }} - not-matthias</div>
      <v-spacer></v-spacer>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>
