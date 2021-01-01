<template lang="pug">
.app-header
  v-app-bar(
    color="deep-purple accent-4"
    dark
  )
    v-app-bar-nav-icon
    v-toolbar-title 商品管理
    v-spacer
    nuxt-link(to="/") トップ
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

/** 共通ヘッダー */
export default defineComponent({});
</script>

<style lang="scss"></style>
