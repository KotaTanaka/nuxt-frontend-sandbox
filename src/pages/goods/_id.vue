<template lang="pug">
v-container
  PageHeading(title="商品詳細" :breadcrumbList="breadcrumbList")
  .contents
    GoodsDetailTable(:goods="goods")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsDetailTable from '@/components/GoodsDetailTable.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品詳細ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsDetailTable,
  },
})
export default class GoodsDetailPage extends Vue {
  async fetch({ store, route }): Promise<void> {
    await store.dispatch('goods/fetchGoodsDetail', {
      token: store.state.user.userToken,
      id: route.params.id,
    });
  }

  get goods(): IGoodsDetailResponse {
    return this.$store.state.goods.goods;
  }

  get breadcrumbList(): Array<IBreadcrumb> {
    return [
      { name: 'トップ', path: PAGE_URL.TOP },
      { name: '商品一覧', path: PAGE_URL.GOODS },
      { name: this.goods.name, path: this.$route.path },
    ];
  }
}
</script>

<style lang="scss"></style>
