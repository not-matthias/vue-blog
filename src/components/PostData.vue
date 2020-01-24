<template>
  <div>
    <!-- Calendar -->
    <span class="post-data pr-2">
      <v-icon small>calendar_today</v-icon>
      {{ metaData.date }}
    </span>

    <!-- Author -->
    <span
      class="post-data selectable pr-2 link hidden-xs-only"
      @click="$router.push({ name: 'author', params: { author: metaData.author } })"
      hidden-sm-and-down
    >
      <v-icon small>edit</v-icon>
      {{ metaData.author }}
    </span>

    <!-- Category -->
    <span
      class="post-data selectable pr-2 link hidden-xs-only"
      @click="$router.push({ name: 'category', params: { category: metaData.category } })"
    >
      <v-icon small>folder_open</v-icon>
      {{ metaData.category }}
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
import { IMetaData } from '@/utils/github_api';

@Component
export default class PostData extends Vue {
  @Prop() private metaData!: IMetaData;
}
</script>

<style scoped>
.link:hover {
  cursor: pointer;
}

.post-data {
  /* font-weight: normal; */
  font-size: 0.65em;
  vertical-align: middle;
}
</style>
