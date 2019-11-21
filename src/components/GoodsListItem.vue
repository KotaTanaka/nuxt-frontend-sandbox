<template lang="pug">
v-card(min-width="300")
  v-card-text
    div 商品ID: {{ goods.id }}
    p(class="display-1 text--primary") {{ goods.name }}
    p {{ goods.price }} 円
    div(class="text--primary") {{ goods.description }}
  v-card-actions
    v-btn(text) 編集
    v-btn(text) 削除
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// from app
import { IGoodsListElement } from '@/interfaces/api/Goods'

/**
 * 商品リスト要素
 * @author kotatanaka
 */
@Component
export default class GoodsList extends Vue {
  @Prop({ type: Array, required: true })
  goods: IGoodsListElement
}
</script>

<style lang="scss"></style>
