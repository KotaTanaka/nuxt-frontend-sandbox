<template lang="pug">
v-container
  PageHeading(title="商品一覧" :breadcrumbList="breadcrumbList")
  GoodsList(:goodsList="goodsList")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsList from '@/components/GoodsList.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { IAPIError } from '@/interfaces/api/response/Error';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';

/**
 * 商品一覧ページ
 * @author kotatanaka
 */
@Component({
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsList,
  },
})
export default class GoodsPage extends Vue {
  async fetch({ store }): Promise<void> {
    try {
      await store.dispatch('goods/fetchGoodsList', {
        token: store.state.user.userToken,
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

  get goodsList(): Array<IGoodsListElement> {
    return this.$store.state.goods.goodsList;
  }

  get breadcrumbList(): Array<IBreadcrumb> {
    return [
      { name: 'トップ', path: PAGE_URL.TOP },
      { name: '商品一覧', path: this.$route.path },
    ];
  }
}
</script>

<style lang="scss"></style>
