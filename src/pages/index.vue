<template lang="pug">
div
  h1 トップページ
  div
    nuxt-link(to="/goods") 商品一覧
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

<style></style>
