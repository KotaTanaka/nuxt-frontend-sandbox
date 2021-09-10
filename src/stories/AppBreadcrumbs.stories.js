import AppBreadcrumbs from '../components/partials/AppBreadcrumbs.vue';

export default {
  title: 'Partials/AppBreadcrumbs',
  component: AppBreadcrumbs,
};

const Template = () => ({
  props: {
    breadcrumbList: { type: Array, required: true },
  },
  components: { AppBreadcrumbs },
  template: `<AppBreadcrumbs :breadcrumbList="breadcrumbList" />`,
});

export const DetailPage = Template.bind({});
DetailPage.args = {
  breadcrumbList: [
    { name: 'トップ', path: '/' },
    { name: '商品一覧', path: '/goods' },
    { name: '商品詳細', path: '' },
  ],
};
