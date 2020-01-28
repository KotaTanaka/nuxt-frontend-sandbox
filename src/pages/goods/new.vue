<template lang="pug">
v-container
  PageHeading(title="商品登録")
  .contents
    GoodsNewForm
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// from app
import PageHeading from '@/components/common/PageHeading.vue'
import GoodsNewForm from '@/components/GoodsNewForm.vue'

/**
 * 商品登録ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsNewForm
  }
})
export default class GoodsNewPage extends Vue {}
</script>

<style lang="scss">
.contents {
  margin-top: 64px;
}
</style>
