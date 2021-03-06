<template>
  <div>
    <!-- <notifications group="postlist"/> -->

    <!-- If -->
    <div class="pt-5" v-if="loading">
      <v-container>
        <v-row justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </v-container>
    </div>

    <!-- Else -->
    <div v-else>
      <v-container grid-list-xl>
        <!-- Title -->
        <v-flex v-if="tag || category" xs12 sm10 offset-sm1 xl8 offset-xl2>
          <div class="custom-card pa-3 pl-4 my-4">
            <h1 v-show="tag">Tag: {{ tag }}</h1>
            <h1 v-show="category">Category: {{ category }}</h1>
          </div>
        </v-flex>

        <!-- Post List -->
        <v-data-iterator
          hide-default-footer
          row
          wrap
          :items="filteredFiles"
          :search="search"
          :custom-filter="customFilter"
          :items-per-page-options="perPage"
          :options="pagination"
        >
          <v-flex xs12 sm10 offset-sm1 xl6 offset-xl3 slot="item" slot-scope="file" class="pa-3">
            <ListItem :hash="file.item.hash" :metaData="file.item.metaData" />
          </v-flex>
        </v-data-iterator>
      </v-container>

      <!-- Pagination -->
      <div class="text-xs-center pb-3">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';

import config from '@/config';
import github_api, { IFile } from '@/utils/github_api';

@Component({
  components: {
    ListItem
  }
})
export default class PostList extends Vue {
  @Prop({ default: '' }) private search?: string;
  @Prop({ default: '' }) private category?: string;
  @Prop({ default: '' }) private tag?: string;

  private loading: boolean = true;
  private files: IFile[] = [];
  private filteredFiles: IFile[] = [];

  private perPage: number[] = [5, 10, 100];
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
    let length: number = this.pagination.totalItems;

    if (this.category) {
      length = this.customFilter(this.files, this.category, null).length;
    } else if (this.tag) {
      length = this.customFilter(this.files, this.tag, null).length;
    } else if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
      return 0;
    }

    return Math.ceil(length / this.pagination.rowsPerPage);
  }

  /**
   * Loads the post list.
   */
  private async loadList() {
    try {
      this.filteredFiles = this.files = await github_api.getList();
      this.pagination.totalItems = this.files.length;
    } catch (error) {
      // this.$notify({
      //   group: 'postlist',
      //   type: 'error',
      //   title: 'Error',
      //   text: 'Failed to load posts!'
      // });
    }
  }

  /**
   * Custom item filter.
   * @returns IFile[]
   */
  private customFilter(items: IFile[], search: string, filter: any): IFile[] {
    // Category, Tag or Search?
    if (this.category) {
      return items.filter(item => item.metaData.category === this.category);
    } else if (this.tag) {
      return items.filter(item => item.metaData.tags.includes(this.tag || ''));
    } else {
      return items.filter(item => item.metaData.title.includes(search));
    }
  }
}
</script>

<style scoped>
.custom-card {
  background-color: white;
  border: 1px solid #ddd;
  border-left: 4px solid black;
}
</style>
