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
import { Component, Prop, Vue } from 'nuxt-property-decorator';

// from app
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品詳細テーブル
 * @author kotatanaka
 */
@Component
export default class GoodsDetailTable extends Vue {
  @Prop({ type: Object, required: true })
  goods: IGoodsDetailResponse;

  get tableHeaders() {
    return [{ value: 'name' }, { value: 'value' }];
  }

  get tableItems() {
    return [
      { name: 'ID', value: this.goods.id },
      { name: '説明', value: this.goods.description },
      { name: '価格', value: this.goods.price },
      { name: '登録日時', value: this.goods.createdAt },
      { name: '更新日時', value: this.goods.updatedAt },
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
