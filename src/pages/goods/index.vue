<template lang="pug">
v-container
  PageHeading(
    title="商品一覧"
    :breadcrumbList="breadcrumbList"
  )
  GoodsList(@updateGoods="updateGoods")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsList from '@/components/GoodsList.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

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
  /** トークン */
  get userToken(): string {
    return this.$store.state.user.userToken;
  }

  /** パンくず */
  get breadcrumbList(): Array<IBreadcrumb> {
    return [
      { name: 'トップ', path: PAGE_URL.TOP },
      { name: '商品一覧', path: this.$route.path },
    ];
  }

  /** ライフサイクル */
  async fetch(): Promise<void> {
    await this.fetchGoods();
  }

  /** 商品一覧取得 */
  async fetchGoods(): Promise<void> {
    try {
      await this.$store.dispatch('goods/fetchGoodsList', {
        token: this.userToken,
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

  /** 商品更新 */
  async updateGoods(payload: {
    id: number;
    body: IUpdateGoodsRequestBody;
  }): Promise<void> {
    try {
      await this.$store.dispatch('goods/updateGoods', {
        token: this.userToken,
        id: payload.id,
        body: payload.body,
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品情報の更新に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    // 一覧の再取得
    await this.fetchGoods();
  }
}
</script>

<style lang="scss"></style>
