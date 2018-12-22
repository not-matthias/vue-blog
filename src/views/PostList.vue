<template>
  <div>
    <Header/>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 v-for="(post, key) in posts" :key="key">
          <!-- Card -->
          <v-card class="pa-3" raised to="/">
            <!-- Card Title -->
            <v-card-title primary-title>
              <div>
                <h1 class="headline font-weight-bold">{{post.title}}</h1>

                <!-- Information -->
                <p class="pt-3">
                  <v-icon small>calendar_today</v-icon>
                  &nbsp;{{post.date}}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <v-icon small>edit</v-icon>&nbsp;not-matthias
                </p>
              </div>
            </v-card-title>

            <!-- Card Text -->
            <v-card-text class="pt-0">Description.</v-card-text>
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

  private async mounted() {
    await this.loadList();
  }

  private async loadList() {
    this.posts = await github_api.getList();
  }
}
</script>


<style>
.headline:hover {
  color: #da4453;
  transition: all 0.3s;
  text-decoration: none;
  cursor: pointer;
}
</style>
