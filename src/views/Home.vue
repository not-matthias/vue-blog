<template>
  <div>
    <Header />

    <v-container>
      <v-jumbotron color="grey darken-3" dark>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h1
                class="font-weight-thin"
                :class="{
                  'display-4 pb-3': $vuetify.breakpoint.smAndUp,
                  'display-3 pb-1': $vuetify.breakpoint.xsOnly
                }"
              >
                Welcome
              </h1>
              <h3 class="font-weight-thin headline">I write about different computer science topics.</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-container>

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
