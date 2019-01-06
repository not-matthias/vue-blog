import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import App from '@/App.vue';
import router from '@/router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuetify);

describe('App.vue', () => {
  it('should mount correctly', () => {
    const wrapper = shallowMount(App, {
      localVue,
      router
    });

    // should have routes and children
    expect(wrapper.vm.$route).toBeInstanceOf(Object);
    expect(wrapper.vm.$children).toBeDefined();
  });
});
