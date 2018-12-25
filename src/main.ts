import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import highlight from 'highlight.js';

// Stylesheets
import 'highlight.js/styles/darcula.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.directive('highlightjs', {
  // @ts-ignore
  deep: true,
  bind(el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value;
      }
      highlight.highlightBlock(target);
    });
  },
  componentUpdated(el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (binding.value) {
        target.textContent = binding.value;
        highlight.highlightBlock(target);
      }
    });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
