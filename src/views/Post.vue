<template>
  <div>
    <Header/>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-card class="pa-3" raised>
            <v-card-title primary-title>
              <div>
                <h1 class="font-weight-bold">{{title}}</h1>

                <!-- Information -->
                <p class="pt-2">
                  <!-- Date -->
                  <span>
                    <v-icon small>calendar_today</v-icon>
                    &nbsp;{{date}}&nbsp;
                  </span>

                  <!-- Author -->
                  <span>
                    <v-icon small>edit</v-icon>
                    &nbsp;{{author}}
                  </span>
                </p>
              </div>
            </v-card-title>

            <!-- Card Text -->
            <v-card-text class="pt-0">
              <v-divider class="pa-3"></v-divider>
              <article v-html="htmlContent()"></article>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- <v-btn icon top left fab>
      <v-icon>arrow_back_ios</v-icon>
    </v-btn>-->
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
import moment from 'moment';
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

  /**
   * Generates the html content from markdown.
   */
  private htmlContent(): string {
    return marked(this.content);
  }

  /**
   * Loads the post when created.
   */
  private created() {
    this.loadPost();
  }

  /**
   * Loads a specific post.
   */
  private async loadPost() {
    const data = await github_api.getContentWithMetaData(this.$route.params.hash);

    // Set data
    this.content = data.content;
    this.title = data.title;
    this.date = data.date;
    this.tags = data.tags;
    this.description = data.description;
    this.author = data.author;
  }
}
</script>
