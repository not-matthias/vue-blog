<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>{{name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Buttons -->
      <v-toolbar-items>
        <v-btn flat @click="$router.push({ name: 'posts' })">Posts</v-btn>
        <v-btn flat @click="$router.push({ name: 'search' })">Search</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from '../config';

@Component
export default class Header extends Vue {
  private name: string = 'My Blog';

  /**
   * Sets the variables via the config.
   */
  private created() {
    this.name = config.title;
  }
}
</script>