<template lang="pug">
v-container
  PageHeading(title="商品詳細")
  p {{ goods.id }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// from app
import PageHeading from '@/components/common/PageHeading.vue'

/**
 * 商品詳細ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  middleware: 'authentication',
  components: {
    PageHeading
  }
})
export default class GoodsDetailPage extends Vue {
  async fetch({ store, route }): Promise<void> {
    await store.dispatch('goods/fetchGoodsDetail', {
      token: store.state.user.userToken,
      id: route.params.id
    })
  }

  get goods() {
    return this.$store.state.goods.goods
  }
}
</script>

<style lang="scss"></style>
