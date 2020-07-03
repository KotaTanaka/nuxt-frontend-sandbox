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
import { Store } from 'vuex';

// from app
import GoodsListItem from '@/components/GoodsListItem.vue';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';
import { RootStore } from '@/store';

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
  get goodsList(): IGoodsListElement[] {
    const { state }: Store<RootStore> = this.$store;
    return state.goods.goodsList;
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
