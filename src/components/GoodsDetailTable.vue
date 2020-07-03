<template lang="pug">
.goods-detail-table
  p.goods-name {{ goods.name }}
  v-data-table(
    :headers="tableHeaders"
    :items="tableItems"
    hide-default-header
    hide-default-footer
  )
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品詳細テーブル
 * @author kotatanaka
 */
@Component
export default class GoodsDetailTable extends Vue {
  /** 商品データ */
  get goods(): IGoodsDetailResponse {
    return this.$store.state.goods.goods;
  }

  /** テーブルヘッダ */
  get tableHeaders() {
    return [{ value: 'name' }, { value: 'value' }];
  }

  /** テーブル項目 */
  get tableItems() {
    const { id, description, price, createdAt, updatedAt } = this.goods;

    return [
      { name: 'ID', value: id },
      { name: '説明', value: description },
      { name: '価格', value: price },
      { name: '登録日時', value: createdAt },
      { name: '更新日時', value: updatedAt },
    ];
  }
}
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
