import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';

// Stylesheets
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'highlight.js/styles/darcula.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
