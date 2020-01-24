import Vue from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';

// Import stylesheets
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

declare module 'vue/types/vue' {
    interface Vue {
            $vuetify: any;
    }
}

Vue.use(Vuetify);

export default new Vuetify({});
