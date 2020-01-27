<template lang="pug">
v-container
  v-row
    v-col(v-for="goods in goodsList" :key="goods.id")
      GoodsListItem(:goods="goods")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// from app
import { IGoodsListElement } from '@/interfaces/api/response/Goods'
import GoodsListItem from '@/components/GoodsListItem.vue'

/**
 * 商品リスト
 * @author kotatanaka
 */
@Component({
  components: {
    GoodsListItem
  }
})
export default class GoodsList extends Vue {
  @Prop({ type: Array, required: true })
  goodsList?: Array<IGoodsListElement>
}
</script>

<style lang="scss"></style>
