import AppHeader from '../components/partials/AppHeader.vue';

export default {
  title: 'Partials/AppHeader',
  component: AppHeader,
};

export const Template = () => ({
  components: { AppHeader },
  template: '<AppHeader />',
});
