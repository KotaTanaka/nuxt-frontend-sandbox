<template lang="pug">
.goods-new
  v-form(v-model="valid").form
    v-text-field(
      v-model="formState.name"
      :rules="nameRules"
      label="商品名"
      required
    )
    v-text-field(
      v-model="formState.description"
      :rules="descriptionRules"
      label="商品説明"
    )
    v-text-field(
      v-model="formState.price"
      :rules="priceRules"
      label="価格"
      required
    )
    v-btn(:disabled="!valid" @click="submit") 登録
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api';
import { ICreateGoodsRequestBody } from '@/interfaces/api/request/Goods';

/** 商品登録フォーム */
export default defineComponent({
  setup(_, { emit }: SetupContext) {
    /** 入力値 */
    const formState = reactive({
      // 商品名
      name: '',
      // 商品説明
      description: '',
      // 価格
      price: 0,
    });

    // TODO バリデーション
    const valid = ref<boolean>(true);
    const nameRules = [];
    const descriptionRules = [];
    const priceRules = [];

    /** 登録ボタン押下時の処理 */
    const submit = () => {
      const body: ICreateGoodsRequestBody = {
        name: formState.name,
        description: formState.description,
        price: formState.price,
      };

      emit('submit', body);
    };

    return {
      formState,
      valid,
      nameRules,
      descriptionRules,
      priceRules,
      submit,
    };
  },
});
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
