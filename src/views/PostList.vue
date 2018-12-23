<template>
  <div>
    <Header/>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex
          v-for="(post, key) in posts"
          :key="key"
          @mouseover="isHovering=true"
          @mouseleave="isHovering=false"
        >
          <!-- Card -->
          <v-card class="pa-3" raised :to="`/post/${post.hash}`">
            <!-- Card Title -->
            <v-card-title primary-title>
              <div>
                <h1 class="font-weight-bold" :class="{ onHover: isHovering }">{{post.title}}</h1>

                <!-- Information -->
                <p class="pt-3">
                  <v-icon small>calendar_today</v-icon>
                  &nbsp;{{post.date}}
                </p>
              </div>
            </v-card-title>
          </v-card>
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
import config, { ICategory } from '../config';
import github_api, { IFile } from '../utils/github_api';

// @ts-ignore
@Component({
  components: {
    Footer,
    Header
  }
})
export default class Posts extends Vue {
  private posts: IFile[] = [];
  private isHovering: boolean = false;

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
    this.posts = await github_api.getList();
  }
}
</script>


<style>
h1 {
  transition: all 0.3s;
}

.onHover {
  color: #c62828;
}
</style>
