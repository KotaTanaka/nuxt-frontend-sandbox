<template lang="pug">
.goods-new
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
    v-btn(:disabled="!valid" @click="submit") 登録
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator';

// from app
import { ICreateGoodsRequestBody } from '@/interfaces/api/request/Goods';

/**
 * 商品登録フォーム
 * @author kotatanaka
 */
@Component
export default class GoodsNewForm extends Vue {
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

  /**
   * 登録ボタン押下時の処理
   * @return ICreateGoodsRequestBody
   */
  @Emit('submit')
  submit(): ICreateGoodsRequestBody {
    return {
      name: this.nameValue,
      description: this.descriptionValue,
      price: this.priceValue,
    };
  }
}
</script>

<style lang="scss">
.goods-new {
  display: flex;
  justify-content: center;

  > .form {
    width: 360px;
  }
}
</style>
