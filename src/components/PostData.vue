<template>
  <div>
    <!-- Calendar -->
    <span class="pr-2">
      <v-icon small>calendar_today</v-icon>
      {{this.metaData.date}}
    </span>

    <!-- Author -->
    <span class="pr-2">
      <v-icon small>edit</v-icon>
      {{this.metaData.author}}
    </span>

    <!-- Category -->
    <span
      class="link"
      @click="$router.push({ name: 'category', params: { category: metaData.category }})"
    >
      <v-icon small>folder_open</v-icon>
      {{this.metaData.category}}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMetaData } from '../utils/github_api';

@Component
export default class PostData extends Vue {
  @Prop() private metaData!: IMetaData;
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
