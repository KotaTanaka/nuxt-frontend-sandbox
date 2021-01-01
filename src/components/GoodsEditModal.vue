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
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

interface Props {
  dialog: boolean;
  goods: IGoodsDetailResponse;
}

/** 商品編集モーダル */
export default defineComponent({
  props: {
    dialog: { type: Boolean, required: true },
    goods: { type: Object, required: true },
  },
  setup(props: Props, { emit }: SetupContext) {
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

    /** ライフサイクル */
    onBeforeMount(() => {
      // フォームの初期値に現在値をセットする
      formState.name = props.goods.name;
      formState.description = props.goods.description;
      formState.price = props.goods.price;
    });

    /** 更新ボタン押下時の処理 */
    const submit = () => {
      const body: IUpdateGoodsRequestBody = {
        name: formState.name !== props.goods.name ? formState.name : undefined,
        description:
          formState.description !== props.goods.description
            ? formState.description
            : undefined,
        price:
          formState.price !== props.goods.price ? formState.price : undefined,
      };

      emit('submit', props.goods.id, body);
    };

    /** キャンセルボタン押下時の処理 */
    const cancel = () => emit('cancel');

    return {
      formState,
      valid,
      nameRules,
      descriptionRules,
      priceRules,
      submit,
      cancel,
    };
  },
});
</script>

<style lang="scss">
.goods-edit {
  padding: 16px;
}
</style>
