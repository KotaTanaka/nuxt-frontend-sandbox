<template lang="pug">
v-container
  v-row
    v-col(v-for="goods in goodsList" :key="goods.id")
      GoodsListItem(
        :goods="goods"
        @updateGoods="updateGoods"
        @deleteGoods="deleteGoods"
      )
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator';

// from app
import { IGoodsListElement } from '@/interfaces/api/response/Goods';
import GoodsListItem from '@/components/GoodsListItem.vue';

/**
 * 商品リスト
 * @author kotatanaka
 */
@Component({
  components: {
    GoodsListItem,
  },
})
export default class GoodsList extends Vue {
  /** 商品一覧 */
  get goodsList(): Array<IGoodsListElement> {
    return this.$store.state.goods.goodsList;
  }

  /** 商品更新 */
  @Emit('updateGoods')
  updateGoods(): void {}

  /** 商品削除 */
  @Emit('deleteGoods')
  deleteGoods(): void {}
}
</script>

<style lang="scss"></style>
