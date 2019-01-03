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
      class="pr-2 link"
      @click="$router.push({ name: 'category', params: { category: metaData.category }})"
    >
      <v-icon small>folder_open</v-icon>
      {{this.metaData.category}}
    </span>

    <!-- Tags -->
    <!-- <span>
      <v-icon small class="pr-1">label</v-icon>

      <span
        class="link"
        v-for="(tag, key) in metaData.tags"
        :key="key"
        @click="$router.push({ name: 'tag', params: { tag }})"
      >{{ tag.concat((metaData.tags.indexOf(tag) != metaData.tags.length - 1) ? ", " : "") }}</span>
    </span>-->
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
.link:hover {
  cursor: pointer;
}
</style>
