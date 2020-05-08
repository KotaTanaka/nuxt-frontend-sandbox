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
import { IAPIError } from '@/interfaces/api/response/Error';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品詳細ページ
 * @author kotatanaka
 */
@Component({
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsDetailTable,
  },
})
export default class GoodsDetailPage extends Vue {
  async fetch({ store, route }): Promise<void> {
    try {
      await store.dispatch('goods/fetchGoodsDetail', {
        token: store.state.user.userToken,
        id: route.params.id,
      });
    } catch (err) {
      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の取得に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });
    }
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
