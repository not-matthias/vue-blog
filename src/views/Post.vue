<template>
  <div>
    <Header/>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-card class="pa-3" raised>
            <v-card-title primary-title>
              <div>
                <h1 class="font-weight-bold">{{metaData.title}}</h1>

                <!-- Information -->
                <p class="pt-2">
                  <!-- Date -->
                  <span>
                    <v-icon small>calendar_today</v-icon>
                    &nbsp;{{metaData.date}}&nbsp;
                  </span>

                  <!-- Author -->
                  <span>
                    <v-icon small>edit</v-icon>
                    &nbsp;{{metaData.author}}
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
import github_api, { IFile, IMetaData } from '../utils/github_api';

// @ts-ignore
@Component({
  components: {
    Footer,
    Header
  }
})
export default class Post extends Vue {
  private content: string = '';
  private metaData: IMetaData = {
    title: '',
    date: '',
    tags: [],
    description: '',
    author: ''
  };

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
    this.content = await github_api.getContent(this.$route.params.hash);
    this.metaData = await github_api.getMetaData(this.$route.params.hash);
  }
}
</script>
