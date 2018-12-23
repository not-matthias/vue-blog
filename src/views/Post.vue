<template>
  <div>
    <Header/>

    <v-container>
      <h1>{{ title }}</h1>

      <!-- Information -->
      <p class="pt-2">
        <!-- Date -->
        <v-span>
          <v-icon small>calendar_today</v-icon>
          &nbsp;{{date}}
        </v-span>

        <!-- Divide it -->
        &nbsp;
        <!-- Author -->
        <v-span>
          <v-icon small>edit</v-icon>
          &nbsp;{{author}}
        </v-span>
      </p>

      <v-divider class="pa-3"/>

      <article v-html="htmlContent()"></article>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import config from '../config';
import marked from '../utils/renderer';
import fm from 'front-matter';
import github_api, { IFile } from '../utils/github_api';

// @ts-ignore
@Component({
  components: {
    Footer,
    Header
  }
})
export default class Post extends Vue {
  private content: string = '';
  private author: string = '';
  private title: string = '';
  private date: string = '';
  private description: string = '';
  private tags: string[] = [];

  private htmlContent(): string {
    return marked(this.content);
  }

  private created() {
    this.loadPost();
  }

  /**
   * Loads a specific post.
   */
  private async loadPost() {
    const response = await github_api.getContent(this.$route.params.hash);

    // Parse front-matter (to get meta-data)
    const content: any = fm(response);

    // Set data
    this.content = content.body;
    this.title = content.attributes.title;
    this.date = content.attributes.date;
    this.tags = content.attributes.tags;
    this.description = content.attributes.description;
    this.author = content.attributes.author;
  }
}
</script>
