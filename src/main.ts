import Vue from 'vue';
import Vuetify from 'vuetify';
import VueNotification from 'vue-notification';
import App from '@/App.vue';
import router from '@/router';

// Import service worker
import '@/registerServiceWorker';

// Import stylesheets
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'highlight.js/styles/darcula.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueNotification);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
