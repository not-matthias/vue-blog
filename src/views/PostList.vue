<template>
  <div>
    <Header/>

    <v-container grid-list-xl>
      <v-data-iterator
        content-tag="v-layout"
        hide-actions
        row
        wrap
        :items="filteredItems"
        :rows-per-page-items="perPage"
        :pagination.sync="pagination"
      >
        <v-flex xs12 slot="item" slot-scope="file">
          <ListItem :hash="file.item.hash" :metaData="file.item.metaData"/>
        </v-flex>
      </v-data-iterator>
    </v-container>

    <div class="text-xs-center">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>

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
  private filteredItems: IFile[] = [];

  private search: string = '';
  private perPage: number[] = [5];
  private pagination = {
    descending: false,
    page: 1,
    rowsPerPage: 5,
    sortBy: '',
    totalItems: 0
  };

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
    this.filteredItems = this.files = await github_api.getList();
    this.pagination.totalItems = this.filteredItems.length;
  }

  /**
   * Returns the number of pages for the pagination.
   * @returns number
   */
  get pages() {
    if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;

    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }
}
</script>
