<template lang="pug">
v-container
  PageHeading(
    title="商品詳細"
    :breadcrumbList="breadcrumbList"
  )
  .contents
    GoodsDetailTable
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
  /** トークン */
  get userToken(): string {
    return this.$store.state.user.userToken;
  }

  /** 商品データ */
  get goods(): IGoodsDetailResponse {
    return this.$store.state.goods.goods;
  }

  /** パンくず */
  get breadcrumbList(): Array<IBreadcrumb> {
    return [
      { name: 'トップ', path: PAGE_URL.TOP },
      { name: '商品一覧', path: PAGE_URL.GOODS },
      { name: this.goods.name, path: this.$route.path },
    ];
  }

  /** ライフサイクル */
  async fetch(): Promise<void> {
    await this.fetchGoods();
  }

  /** 商品詳細取得 */
  async fetchGoods(): Promise<void> {
    try {
      await this.$store.dispatch('goods/fetchGoodsDetail', {
        token: this.userToken,
        id: this.$route.params.id,
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の取得に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });
    }
  }
}
</script>

<style lang="scss"></style>
