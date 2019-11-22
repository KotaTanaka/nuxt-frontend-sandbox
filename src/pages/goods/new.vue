<template lang="pug">
v-container
  PageHeading(title="商品登録")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// from app
import PageHeading from '@/components/common/PageHeading.vue'

/**
 * 商品登録ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  components: {
    PageHeading
  }
})
export default class GoodsNewPage extends Vue {}
</script>

<style lang="scss"></style>
