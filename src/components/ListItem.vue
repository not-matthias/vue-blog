<template>
  <div>
    <v-card
      class="pa-3"
      raised
      :to="{ name: 'post', params: { hash } }"
      @mouseover="isHovering=true"
      @mouseleave="isHovering=false"
    >
      <v-card-title primary-title>
        <div>
          <h1 :class="{ hovering: isHovering }">{{metaData.title}}</h1>

          <PostData class="pt-2" :metaData="metaData"/>
        </div>
      </v-card-title>

      <v-card-text class="py-0">
        <v-divider class="pa-3"></v-divider>

        <p>{{this.metaData.description}}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PostData from '@/components/PostData.vue';

import { IMetaData } from '../utils/github_api';

@Component({
  components: {
    PostData
  }
})
export default class ListItem extends Vue {
  @Prop() private hash!: string;
  @Prop() private metaData!: IMetaData;

  private isHovering: boolean = false;
}
</script>

<style scoped>
h1 {
  transition: all 0.3s;
}

.hovering {
  color: #c62828;
}
</style>
