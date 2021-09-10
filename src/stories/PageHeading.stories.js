import PageHeading from '../components/partials/PageHeading.vue';

export default {
  title: 'Partials/PageHeading',
  component: PageHeading,
};

const Template = () => ({
  props: {
    title: { type: String, required: true },
    breadcrumbList: { type: Array, required: true },
  },
  components: { PageHeading },
  template: `<PageHeading :title="title" :breadcrumbList="breadcrumbList" />`,
});

export const DetailPage = Template.bind({});
DetailPage.args = {
  title: '商品詳細',
  breadcrumbList: [
    { name: 'トップ', path: '/' },
    { name: '商品一覧', path: '/goods' },
    { name: '商品詳細', path: '' },
  ],
};
