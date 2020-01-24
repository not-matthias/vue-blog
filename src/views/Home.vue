<template>
  <div>
    <Header />
    <v-carousel
      cycle
      continuous
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
      class="pa-5"
    >
      <v-carousel-item>
        <v-sheet height="90%" class="grey darken-3 mx-5 px-5" tile>
          <v-container fill-height>
            <!-- Align vertically -->
            <v-layout align-center>
              <!-- Align horizontally -->
              <v-col align="center">
                <h1
                  class="font-weight-thin"
                  :class="{
                    'display-4 pb-3': $vuetify.breakpoint.smAndUp,
                    'display-2 pb-1': $vuetify.breakpoint.xsOnly
                  }"
                >Welcome</h1>
                <h3
                  class="font-weight-thin headline"
                >I write about different computer science topics.</h3>
              </v-col>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Footer,
    Header
  }
})
export default class Home extends Vue {}
</script>
