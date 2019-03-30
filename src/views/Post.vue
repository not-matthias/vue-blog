<template>
  <div>
    <Header/>

    <notifications group="post"/>

    <!-- If -->
    <div class="text-xs-center pa-5" v-if="loading">
      <v-progress-circular indeterminate/>
    </div>

    <!-- Else -->
    <div v-else>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm10 offset-sm1 xl8 offset-xl2>
            <v-card class="pa-3" raised>
              <v-card-title primary-title>
                <div>
                  <h1 class="font-weight-bold">{{ metaData.title }}</h1>

                  <p class="pt-2">
                    <PostData :metaData="metaData"/>
                  </p>
                </div>
              </v-card-title>

              <v-card-text class="pt-0">
                <v-divider class="pa-3"></v-divider>

                <article v-html="htmlContent"></article>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PostData from '@/components/PostData.vue';

import config from '@/config';
import marked from '@/utils/renderer';
import github_api, { IFile, IMetaData } from '@/utils/github_api';

import highlight from 'highlight.js';
import moment from 'moment';
import fm from 'front-matter';

@Component({
  components: {
    Footer,
    Header,
    PostData
  }
})
export default class Post extends Vue {
  private loading: boolean = true;
  private content: string = '';
  private metaData: IMetaData = {
    title: '',
    description: '',
    date: '',
    author: '',
    category: '',
    tags: []
  };

  /**
   * Generates the html content from markdown.
   */
  private get htmlContent(): string {
    return marked(this.content);
  }

  /**
   * Loads the post when created.
   */
  private created() {
    this.loadPost();

    this.loading = false;
  }

  /**
   * Loads a specific post.
   */
  private async loadPost() {
    try {
      this.content = await github_api.getContent(this.$route.params.hash);
      this.metaData = await github_api.getMetaData(this.$route.params.hash);
    } catch (error) {
      this.$notify({
        group: 'post',
        type: 'error',
        title: 'Error',
        text: 'Failed to load post!'
      });
    }
  }
}
</script>

<style>
/* @import url('/github-markdown-css/github-markdown.css'); */

a {
  text-decoration: none;
  font-weight: bold;
  color: black;
  transition: all 0.3s;
}

a:hover {
  color: #c62828; /* = red darken-3 */
  cursor: pointer;
}

p {
  margin-bottom: 0px;
}

h2 {
  margin-top: 1em;
}

h3 {
  margin-top: 1em;
}

h4 {
  margin-top: 1em;
}

img {
  margin-top: 1em;
  margin-bottom: 1em;
}

pre {
  margin-top: 1em;
  margin-bottom: 1rem;
  background-color: WhiteSmoke;
  padding: 16px;
  overflow-x: auto;
  white-space: pre;
}

code {
  font-weight: normal;
  margin-top: 0.5em;
  background-color: WhiteSmoke;
  white-space: pre;
}

blockquote {
  margin: 0;
  padding: 0 16px;
  border-left: 4px solid #ddd;
}

span {
  color: black !important;
}

code {
  color: black !important;
}
</style>