import { addDecorator } from '@storybook/vue'
import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

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
