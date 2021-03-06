<template>
  <div>
    <Header />

    <notifications group="post" />

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
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm10 offset-sm1 xl6 offset-xl3>
            <v-card class="pa-3" raised>
              <v-card-title primary-title>
                <div>
                  <h2 style="word-break: break-word">{{ metaData.title }}</h2>

                  <p class="pt-2">
                    <PostData :metaData="metaData" />
                  </p>
                </div>
              </v-card-title>

              <v-card-text class="pt-0">
                <v-divider class="pa-3"></v-divider>

                <article class="post-content" v-html="htmlContent"></article>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- Comments -->
      <div id="commentPlugin" />
    </div>

    <Footer />
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
   * Load the utterance plugin.
   */
  private mounted() {
    const plugin = document.createElement('script');
    plugin.setAttribute('src', 'https://utteranc.es/client.js');
    plugin.setAttribute('repo', 'not-matthias/not-matthias.github.io');
    plugin.setAttribute('issue-term', 'title');
    plugin.setAttribute('theme', 'github-light');
    plugin.setAttribute('crossorigin', 'anonymous');
    plugin.async = true;

    const element = document.getElementById('commentPlugin');
    if (element != null) {
      element.appendChild(plugin);
    }
  }

  /**
   * Loads a specific post.
   */
  private async loadPost() {
    try {
      this.content = await github_api.getContent(this.$route.params.hash);
      this.metaData = await github_api.getMetaData(this.$route.params.hash);

      document.title = this.metaData.title;
    } catch (error) {
      // this.$notify({
      //   group: 'post',
      //   type: 'error',
      //   title: 'Error',
      //   text: 'Failed to load post!'
      // });
    }
  }
}
</script>

<style scoped lang="scss">
// Styles for the dynamic post content
::v-deep .post-content {
  color: black;

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
    margin-bottom: 16px;
    margin-top: 0;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.25em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 0.875em;
  }

  h6 {
    color: #6a737d;
    font-size: 0.85em;
  }

  h1,
  h2 {
    border-bottom: 1px solid #eaecef;
    padding-bottom: 0.3em;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 16px;
    margin-top: 24px;
  }

  /* Formatting for images */
  img {
    margin-top: 0;
    margin-bottom: 16px;
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }

  /* Formatting for lists */
  li + li {
    /* Leave space between list items */
    margin-top: 0.25em;
  }

  /* Formatting for code blocks */
  pre {
    margin-top: 1em;
    margin-bottom: 1rem;
    background-color: WhiteSmoke;
    padding: 16px;
    overflow-x: auto;
    white-space: pre;

    border-radius: 3px;
  }

  /* Formatting for syntax highlighting */
  code {
    font-weight: normal !important;
    box-shadow: none !important;
    display: initial !important;

    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
  }

  /* Formatting for quotes */
  blockquote {
    border-left: 0.25em solid #dfe2e5;
    padding: 0 1em;
    color: #6a737d;
    margin-top: 0;
    margin-bottom: 16px;
  }

  /* Formatting for keyboard shortcuts */
  kbd {
    font-weight: normal;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: 1px solid #d1d5da;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #d1d5da;
  }

  /* Reset the text color */
  span,
  code {
    color: black !important;
  }
}
</style>
