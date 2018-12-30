<template>
  <div>
    <v-card
      class="pa-3"
      raised
      :to="{ name: 'post', params: { hash: this.hash } }"
      @mouseover="isHovering=true"
      @mouseleave="isHovering=false"
    >
      <v-card-title primary-title>
        <div>
          <h1 class="font-weight-bold" :class="{ hovering: isHovering }">{{this.metaData.title}}</h1>

          <p class="pt-2">
            <span class="pr-2">
              <v-icon small>calendar_today</v-icon>
              {{this.metaData.date}}
            </span>
            
            <span class="pr-2">
              <v-icon small>edit</v-icon>
              {{this.metaData.author}}
            </span>
            
            <span class="pr-2">
              <v-icon small>folder_open</v-icon>
              {{ this.metaData.category }}
            </span>
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
import { IMetaData } from '../utils/github_api';

@Component
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
