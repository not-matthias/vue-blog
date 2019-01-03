<template>
  <div>
    <v-card class="pa-3" raised>
      <v-card-title primary-title>
        <div>
          <h1
            :class="{ hovering: isHovering }"
            class="card-title"
            @click="$router.push({ name: 'post', params: { hash } })"
          >{{metaData.title}}</h1>

          <p class="pt-2">
            <PostData :metaData="metaData"/>
          </p>
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

.card-title:hover {
  cursor: pointer;
  color: #c62828;
}
</style>
