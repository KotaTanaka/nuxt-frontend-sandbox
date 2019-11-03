<template lang="pug">
.header
  h1.heading 商品管理
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * 共通ヘッダー
 * @author kotatanaka
 */
@Component
export default class AppHeader extends Vue {}
</script>

<style lang="scss">
.header {
  background-color: #2c3e50;
  color: white;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  > .heading {
    font-size: 25px;
  }
}
</style>
