<template lang="pug">
.page-container
  h1(v-if="$mq === 'pc'") 商品管理コンソール
  h2(v-else) 商品管理コンソール
  .links
    nuxt-link.link(to="/goods") 商品一覧
    nuxt-link.link(to="/goods/new") 新規登録
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

/** トップページ */
export default defineComponent({
  middleware: 'authentication',
});
</script>

<style lang="scss">
@import 'resources';

.page-container {
  @include page-container;

  color: $text;

  > .links {
    margin-top: 24px;

    @include sp {
      display: flex;
      flex-direction: column;
    }
  }

  > .links > .link {
    padding: 0 16px;

    @include sp {
      margin-top: 16px;
    }
  }
}
</style>
