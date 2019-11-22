<template lang="pug">
v-container
  PageHeading(title="商品詳細")
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
  components: {
    PageHeading
  }
})
export default class GoodsDetailPage extends Vue {}
</script>

<style lang="scss"></style>
