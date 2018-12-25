<template>
  <div>
    <Header/>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 v-for="(file, key) in files" :key="key">
          <ListItem :hash="file.hash" :metaData="file.metaData"/>
        </v-flex>
      </v-layout>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ListItem from '@/components/ListItem.vue';

import config, { ICategory } from '../config';
import github_api, { IFile } from '../utils/github_api';

@Component({
  components: {
    Footer,
    Header,
    ListItem
  }
})
export default class Posts extends Vue {
  private files: IFile[] = [];

  /**
   * Loads the list when mounted.
   */
  private async mounted() {
    await this.loadList();
  }

  /**
   * Loads the post list.
   */
  private async loadList() {
    this.files = await github_api.getList();
  }
}
</script>
