<template lang="pug">
v-container
  PageHeading(title="商品登録")
  .contents
    GoodsNew
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// from app
import PageHeading from '@/components/common/PageHeading.vue'
import GoodsNew from '@/components/GoodsNew.vue'

/**
 * 商品登録ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsNew
  }
})
export default class GoodsNewPage extends Vue {}
</script>

<style lang="scss">
.contents {
  margin-top: 64px;
}
</style>
