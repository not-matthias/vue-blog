import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import VueNotification from 'vue-notification';
import VueParticles from 'vue-particles';
import hljs from 'highlight.js';

// Import service worker
import './registerServiceWorker';

// Import stylesheets
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'highlight.js/styles/darcula.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueNotification);
Vue.use(VueParticles);

Vue.directive('highlightjs', {
  bind(el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated: (el, binding) => {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (binding.value) {
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
