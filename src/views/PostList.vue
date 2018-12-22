<template>
  <div>
    <Header/>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>
          <!-- Card -->
          <v-card class="pa-3" raised to="/">
            <!-- Card Title -->
            <v-card-title primary-title>
              <div>
                <h1 class="headline font-weight-bold">Nostrum voluptatibus nobis id ex repudiandae.</h1>

                <!-- Information -->
                <p class="pt-3">
                  <v-icon small>calendar_today</v-icon>&nbsp;Monday, 1.1.2018
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <v-icon small>edit</v-icon>&nbsp;not-matthias
                </p>
              </div>
            </v-card-title>

            <!-- Card Text -->
            <v-card-text class="pt-0">
              Nostrum voluptatibus nobis id ex repudiandae. Qui accusantium rerum ea sit consequatur alias. A quas distinctio atque maiores.
              Adipisci aut consequuntur tempore nihil eum sapiente magni ipsa. Vel odit ab ab amet id praesentium. Adipisci dolores veniam m
              olestias odio iusto. Eaque omnis sint molestias voluptatem est molestiae omnis. Nihil dignissimos harum molestiae.
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- Flex 2 -->
        <!-- <v-flex xs10 offset-xs1>
          <v-card dark color="purple">
            <v-card-text>xs10 offset-xs1</v-card-text>
          </v-card>
        </v-flex>-->
      </v-layout>
    </v-container>

    <Footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

// @ts-ignore
@Component({
  components: {
    Footer,
    Header
  }
})
export default class Posts extends Vue {
  private cards = [
    {
      title: 'Pre-fab homes',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      flex: 12
    },
    {
      title: 'Favorite road trips',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
      flex: 6
    },
    {
      title: 'Best airlines',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
      flex: 6
    }
  ];
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
