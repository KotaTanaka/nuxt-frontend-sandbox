<template lang="pug">
v-container.top-page
  h1 商品管理コンソール
  .links
    nuxt-link.link(to="/goods") 商品一覧
    nuxt-link.link(to="/") ページ未作成
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

/**
 * トップページ
 * @author kotatanaka
 */
@Component({
  layout: 'default'
})
export default class TopPage extends Vue {}
</script>

<style lang="scss">
.top-page {
  > .links > .link {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
