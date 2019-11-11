<template lang="pug">
div
  ul
    li(v-for="goods in goodsList") {{ goods.id }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// from app
import { IGoodsListElement } from '@/interfaces/api/Goods'

/**
 * 商品リスト
 * @author kotatanaka
 */
@Component
export default class GoodsList extends Vue {
  @Prop({ type: Array, required: true })
  goodsList: Array<IGoodsListElement> = []
}
</script>

<style lang="scss"></style>
