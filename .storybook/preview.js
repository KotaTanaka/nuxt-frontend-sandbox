import { addDecorator } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

/** nuxt-link */
Vue.component('nuxt-link', {
  props: ['to'],
    methods: {
      log() {
        action('nuxt-link to')(this.to)
      },
    },
  template: '<a href="#" @click.prevent="log()"><slot /></a>',
})

/** Vuetify */
Vue.use(Vuetify);
addDecorator(() => ({
  vuetify: new Vuetify({
    customVariables: ['../src/assets/styles/_variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#8A0868',
          secondary: '#B40486',
          tertiary: '#DF01A5',
          error: '#b71c1c',
        },
      },
    },
  }),
  template: '<v-app><story /></v-app>',
}));
