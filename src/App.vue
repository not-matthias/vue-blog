<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

.selectable {
  transition: all 0.3s;
}

.selectable:hover {
  color: #c62828; /* = red darken-3 */
  cursor: pointer;
}
</style>
