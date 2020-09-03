import { action } from '@storybook/addon-actions';
import ConfirmDialog from '../components/partials/ConfirmDialog.vue';

export default {
  title: 'Partials/ConfirmDialog',
  component: ConfirmDialog,
};

const Template = () => ({
  props: {
    dialog: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    label: { type: String, required: true },
  },
  methods: {
    submit: action('Submit.'),
    cancel: action('Cancel.'),
  },
  components: { ConfirmDialog },
  template: `<ConfirmDialog :dialog="dialog" :title="title" :message="message" :label="label" @submit="submit" @cancel="cancel" />`,
});

export const DeleteDialog = Template.bind({});
DeleteDialog.args = {
  dialog: true,
  title: '商品削除',
  message: '本当に削除しますか？',
  label: '削除',
};
