<template lang="pug">
v-container
  PageHeading(title="商品一覧")
  GoodsList(:goodsList="goodsList")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// from app
import PageHeading from '@/components/common/PageHeading.vue'
import GoodsList from '@/components/GoodsList.vue'

/**
 * 商品一覧ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  components: {
    PageHeading,
    GoodsList
  }
})
export default class GoodsPage extends Vue {
  async fetch({ store }): Promise<void> {
    await store.dispatch('goods/fetchGoodsList', {
      token: '9cb5e40545364a0a928beafbfdd81d6e'
    })
  }

  get goodsList() {
    return this.$store.state.goods.goodsList
  }
}
</script>

<style lang="scss"></style>