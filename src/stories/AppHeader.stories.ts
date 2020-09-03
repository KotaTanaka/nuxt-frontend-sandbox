import AppHeader from '../components/partials/AppHeader.vue';

export default {
  title: 'Partials/AppHeader',
  component: AppHeader,
};

export const Base = () => ({
  components: { AppHeader },
  template: '<AppHeader />',
});
