<template lang="pug">
v-container.top-page
  h1(v-if="$mq === 'pc'") 商品管理コンソール
  h2(v-else) 商品管理コンソール
  .links
    nuxt-link.link(to="/goods") 商品一覧
    nuxt-link.link(to="/goods/new") 新規登録
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

/**
 * トップページ
 * @author kotatanaka
 */
@Component({
  middleware: 'authentication',
})
export default class TopPage extends Vue {}
</script>

<style lang="scss">
@import '@/assets/styles/resources';

.top-page {
  color: $text;
  margin-top: 64px;

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
