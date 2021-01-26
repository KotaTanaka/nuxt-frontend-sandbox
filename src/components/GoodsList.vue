<template lang="pug">
.goods-list
  v-row
    v-col(v-for="goods in goodsList" :key="goods.id")
      GoodsListItem(
        :goods="goods"
        @updateGoods="updateGoods"
        @deleteGoods="deleteGoods"
      )
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  SetupContext,
} from '@nuxtjs/composition-api';
import GoodsListItem from '@/components/GoodsListItem.vue';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';

/** 商品リスト */
export default defineComponent({
  components: {
    GoodsListItem,
  },
  setup(_, { emit }: SetupContext) {
    const root = getCurrentInstance();

    /** 商品一覧 */
    const goodsList = computed<IGoodsListElement[]>(() => {
      return root.$typedStore.state.goods.goodsList;
    });

    /** 商品更新 */
    const updateGoods = (id: number, body: IUpdateGoodsRequestBody) =>
      emit('updateGoods', id, body);

    /** 商品削除 */
    const deleteGoods = (id: number) => emit('deleteGoods', id);

    return {
      goodsList,
      updateGoods,
      deleteGoods,
    };
  },
});
</script>

<style lang="scss"></style>
