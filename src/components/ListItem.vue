<template>
  <div>
    <v-card class="pa-3" raised>
      <v-card-title primary-title>
        <div>
          <!-- Title -->
          <h2
            class="selectable"
            style="word-break: break-word"
            @click="$router.push({ name: 'post', params: { hash } })"
          >{{ metaData.title }}</h2>

          <!-- PostData -->
          <PostData class="pt-2" :metaData="metaData" />
        </div>
      </v-card-title>

      <v-card-text>
        <!-- Divider -->
        <v-divider class="pa-3"></v-divider>

        <!-- Description -->
        <p class="pt-0">{{ metaData.description }}</p>

        <!-- Read more -->
        <v-layout align-center justify-end>
          <v-flex offset-xs10>
            <v-btn
              outlined
              color="red darken-3"
              class="pr-3"
              :to="{ name: 'post', params: { hash } }"
            >Read more</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PostData from '@/components/PostData.vue';

import { IMetaData } from '@/utils/github_api';

@Component({
  components: {
    PostData
  }
})
export default class ListItem extends Vue {
  @Prop() private hash!: string;
  @Prop() private metaData!: IMetaData;
}
</script>