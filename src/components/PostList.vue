<template>
  <div>
    <div class="text-xs-center pa-5" v-if="loading">
      <v-progress-circular indeterminate/>
    </div>

    <div v-else>
      <v-container grid-list-xl>
        <v-data-iterator
          content-tag="v-layout"
          hide-actions
          row
          wrap
          :items="filteredFiles"
          :search="search"
          :custom-filter="customFilter"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';

import config from '../config';
import github_api, { IFile } from '../utils/github_api';

@Component({
  components: {
    ListItem
  }
})
export default class PostList extends Vue {
  @Prop({ default: '' }) private search?: string;
  @Prop({ default: '' }) private category?: string;

  private loading: boolean = true;
  private files: IFile[] = [];
  private filteredFiles: IFile[] = [];

  private perPage: number[] = [5];
  private pagination = {
    descending: false,
    page: 1,
    rowsPerPage: 5,
    sortBy: '',
    totalItems: 0
  };

  /**
   * Loads the list when created.
   */
  private async created() {
    await this.loadList();

    this.loading = false;
  }

  /**
   * Returns the number of pages for the pagination.
   * @returns number
   */
  get pages() {
    if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
    return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
  }

  /**
   * Loads the post list.
   */
  private async loadList() {
    this.filteredFiles = this.files = await github_api.getList();
    this.pagination.totalItems = this.files.length;
  }

  /**
   * Custom item filter.
   * @returns IFile[]
   */
  private customFilter(items: IFile[], search: string, filter: any): IFile[] {
    // Category or Search?
    if (this.category) {
      return items.filter(item => item.metaData.category === this.category);
    } else {
      return items.filter(item => item.metaData.title.includes(search));
    }
  }
}
</script>