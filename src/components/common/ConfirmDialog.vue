<template lang="pug">
v-dialog(v-model="dialog" persistent max-width="290")
  v-card.confirm
    v-card-title(class="headline") {{ title }}
    v-card-text {{ message }}
    v-card-actions
      v-spacer
      v-btn(@click.native="onClickCancel") キャンセル
      v-btn(color="red" @click.native="onClickOK") 削除
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

/**
 * 最終確認モーダル
 * @author kotatanaka
 */
@Component
export default class ConfirmDialog extends Vue {
  @Prop({ type: Boolean, required: true })
  dialog: boolean

  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: String, required: true })
  message: string

  @Emit('close')
  onClickCancel() {}

  @Emit('submit')
  onClickOK() {}
}
</script>

<style lang="scss">
.confirm {
  padding: 16px;
}
</style>
