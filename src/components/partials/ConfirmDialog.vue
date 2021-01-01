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
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

/** 最終確認モーダル */
@Component
export default class ConfirmDialog extends Vue {
  /** モーダルの開閉状態 */
  @Prop({ type: Boolean, required: true })
  dialog: boolean;

  /** タイトル */
  @Prop({ type: String, required: true })
  title: string;

  /** メッセージ */
  @Prop({ type: String, required: true })
  message: string;

  /** OKボタンラベル */
  @Prop({ type: String, required: true })
  label: string;

  /** OKボタン押下時の処理 */
  @Emit('submit')
  submit(): void {}

  /** キャンセルボタン押下時の処理 */
  @Emit('cancel')
  cancel(): void {}
}
</script>

<style lang="scss">
.confirm {
  padding: 16px;
}
</style>
