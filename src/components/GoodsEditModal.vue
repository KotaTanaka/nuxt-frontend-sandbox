<template lang="pug">
v-dialog(
  v-model="dialog"
  persistent
  max-width="640"
)
  v-card.goods-edit
    v-card-title(class="headline") 商品情報編集
    v-card-text
      v-form(v-model="valid").form
        v-text-field(
          v-model="nameValue"
          :rules="nameRules"
          label="商品名"
          required
        )
        v-text-field(
          v-model="descriptionValue"
          :rules="descriptionRules"
          label="商品説明"
        )
        v-text-field(
          v-model="priceValue"
          :rules="priceRules"
          label="価格"
          required
        )
    v-card-actions
      v-spacer
      v-btn(@click="cancel") キャンセル
      v-btn(
        :disabled="!valid"
        color="green"
        @click="submit"
      ) 更新
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

// from app
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品編集モーダル
 * @author kotatanaka
 */
@Component
export default class GoodsEditModal extends Vue {
  /** モーダルの開閉状態 */
  @Prop({ type: Boolean, required: true })
  dialog: boolean;

  /** 商品データ */
  @Prop({ type: Object, required: true })
  goods: IGoodsDetailResponse;

  /** 商品名 */
  nameValue = '';

  /** 商品説明 */
  descriptionValue = '';

  /** 価格 */
  priceValue = 0;

  // TODO バリデーション
  valid = true;
  nameRules = [];
  descriptionRules = [];
  priceRules = [];

  /** ライフサイクル */
  mounted() {
    // フォームの初期値に現在値をセットする
    this.nameValue = this.goods.name;
    this.descriptionValue = this.goods.description;
    this.priceValue = this.goods.price;
  }

  /**
   * 更新ボタン押下時の処理
   * @return IUpdateGoodsRequestBody
   */
  @Emit('submit')
  submit(): { id: number; body: IUpdateGoodsRequestBody } {
    return {
      id: this.goods.id,
      body: {
        name: this.nameValue !== this.goods.name ? this.nameValue : undefined,
        description:
          this.descriptionValue !== this.goods.description
            ? this.descriptionValue
            : undefined,
        price:
          this.priceValue !== this.goods.price ? this.priceValue : undefined,
      },
    };
  }

  /** キャンセルボタン押下時の処理 */
  @Emit('cancel')
  cancel() {}
}
</script>

<style lang="scss">
.goods-edit {
  padding: 16px;
}
</style>
