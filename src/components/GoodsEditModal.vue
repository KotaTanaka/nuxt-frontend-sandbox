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
          v-model="formState.nameValue"
          :rules="nameRules"
          label="商品名"
          required
        )
        v-text-field(
          v-model="formState.descriptionValue"
          :rules="descriptionRules"
          label="商品説明"
        )
        v-text-field(
          v-model="formState.priceValue"
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
    const formState = reactive({
      // 商品名
      nameValue: '',
      // 商品説明
      descriptionValue: '',
      // 価格
      priceValue: 0,
    });

    // TODO バリデーション
    const valid = ref<boolean>(true);
    const nameRules = [];
    const descriptionRules = [];
    const priceRules = [];

    /** ライフサイクル */
    onBeforeMount(() => {
      // フォームの初期値に現在値をセットする
      formState.nameValue = props.goods.name;
      formState.descriptionValue = props.goods.description;
      formState.priceValue = props.goods.price;
    });

    /** 更新ボタン押下時の処理 */
    const submit = () => {
      const body: IUpdateGoodsRequestBody = {
        name:
          formState.nameValue !== props.goods.name
            ? formState.nameValue
            : undefined,
        description:
          formState.descriptionValue !== props.goods.description
            ? formState.descriptionValue
            : undefined,
        price:
          formState.priceValue !== props.goods.price
            ? formState.priceValue
            : undefined,
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
