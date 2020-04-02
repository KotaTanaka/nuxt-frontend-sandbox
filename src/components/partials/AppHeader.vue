<template lang="pug">
.app-header
  v-app-bar(color="deep-purple accent-4" dark)
    v-app-bar-nav-icon
    v-toolbar-title 商品管理
    v-spacer
    nuxt-link(to="/") トップ
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

/**
 * 共通ヘッダー
 * @author kotatanaka
 */
@Component
export default class AppHeader extends Vue {}
</script>

<style lang="scss"></style>
