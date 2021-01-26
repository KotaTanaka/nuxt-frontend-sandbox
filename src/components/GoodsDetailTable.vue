<template lang="pug">
.goods-detail-table
  p.goods-name {{ goodsDetail.name }}
  v-data-table(
    :headers="tableHeaders"
    :items="tableItems"
    hide-default-header
    hide-default-footer
  )
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import {
  IVuetifyTableHeader,
  IVuetifyTableItem,
} from '@/interfaces/app/vuetify';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/** 商品詳細テーブル */
export default defineComponent({
  setup() {
    const root = getCurrentInstance();

    /** 商品データ */
    const goodsDetail = computed<IGoodsDetailResponse>(() => {
      return root.$typedStore.state.goods.goods;
    });

    /** テーブルヘッダ */
    const tableHeaders = computed<IVuetifyTableHeader[]>(() => {
      return [{ value: 'name' }, { value: 'value' }];
    });

    /** テーブル項目 */
    const tableItems = computed<IVuetifyTableItem[]>(() => {
      const {
        id,
        description,
        price,
        createdAt,
        updatedAt,
      } = goodsDetail.value;

      return [
        { name: 'ID', value: id },
        { name: '説明', value: description },
        { name: '価格', value: price },
        { name: '登録日時', value: createdAt },
        { name: '更新日時', value: updatedAt },
      ];
    });

    return {
      goodsDetail,
      tableHeaders,
      tableItems,
    };
  },
});
</script>

<style lang="scss">
.goods-detail-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  > .goods-name {
    font-size: 2rem;
  }
}
</style>
