<template lang="pug">
v-dialog(
  v-model="dialog"
  persistent
  max-width="290"
)
  v-card.confirm
    v-card-title(class="headline") {{ title }}
    v-card-text {{ message }}
    v-card-actions
      v-spacer
      v-btn(@click.native="cancel") キャンセル
      v-btn(
        color="red"
        @click.native="submit"
      ) {{ label }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

// eslint-disable-next-line no-unused-vars
interface Props {
  dialog: boolean;
  title: string;
  message: string;
  label: string;
}

/** 最終確認モーダル */
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    label: { type: String, required: true },
  },
  setup(_, { emit }) {
    /** OKボタン押下時の処理 */
    const submit = () => emit('submit');

    /** キャンセルボタン押下時の処理 */
    const cancel = () => emit('cancel');

    return {
      submit,
      cancel,
    };
  },
});
</script>

<style lang="scss">
.confirm {
  padding: 16px;
}
</style>
