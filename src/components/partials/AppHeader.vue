<template lang="pug">
.app-header
  .title 商品管理
  nuxt-link.top(to="/") トップ
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

/** 共通ヘッダー */
export default defineComponent({});
</script>

<style lang="scss">
@import 'resources';

.app-header {
  position: fixed;
  top: 0;
  z-index: $z-index-header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $pc-header-height;
  padding: 0 32px;
  color: white;
  background: $primary;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  @include sp {
    height: $sp-header-height;
  }

  > .title,
  > .top {
    color: white;
  }
}
</style>
