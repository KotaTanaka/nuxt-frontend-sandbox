<template lang="pug">
v-container
  PageHeading(title="商品登録" :breadcrumbList="breadcrumbList")
  .contents
    GoodsNewForm
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsNewForm from '@/components/GoodsNewForm.vue';
import { IBreadcrumb } from '@/interfaces/app';

/**
 * 商品登録ページ
 * @author kotatanaka
 */
@Component({
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsNewForm,
  },
})
export default class GoodsNewPage extends Vue {
  get breadcrumbList(): Array<IBreadcrumb> {
    return [
      { name: 'トップ', path: PAGE_URL.TOP },
      { name: '商品登録', path: this.$route.path },
    ];
  }
}
</script>

<style lang="scss">
.contents {
  margin-top: 64px;
}
</style>
