<template>
  <div>
    <v-card class="pa-3" raised>
      <v-card-title primary-title>
        <div>
          <!-- Title -->
          <h1 class="list-item-title">{{ metaData.title }}</h1>

          <!-- PostData -->
          <PostData class="pt-2" :metaData="metaData"/>
        </div>
      </v-card-title>

      <v-card-text>
        <!-- Divider -->
        <v-divider class="pa-3"></v-divider>

        <!-- Description -->
        <p class="pt-0">{{ metaData.description }}</p>

        <!-- Read more -->
        <v-flex offset-xs10>
          <v-btn outline color="red darken-3" :to="{ name: 'post', params: { hash }}">Read more</v-btn>
        </v-flex>
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

.list-item-title:hover {
  color: #c62828; /* = red darken-3 */
  cursor: pointer;
}
</style>
