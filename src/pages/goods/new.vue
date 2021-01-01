<template lang="pug">
v-container
  PageHeading(
    title="商品登録"
    :breadcrumbList="breadcrumbList"
  )
  .contents
    GoodsNewForm(@submit="registerGoods")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsNewForm from '@/components/GoodsNewForm.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { ICreateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

/** 商品登録ページ */
@Component({
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsNewForm,
  },
})
export default class GoodsNewPage extends Vue {
  /** トークン */
  get userToken(): string {
    return this.$typedStore.state.user.userToken;
  }

  /** パンくず */
  get breadcrumbList(): IBreadcrumb[] {
    return [
      { name: 'トップ', path: this.$C.PAGE_URL.TOP },
      { name: '商品登録', path: this.$route.path },
    ];
  }

  /**
   * 商品登録
   * @param payload リクエストボディ
   */
  async registerGoods(payload: ICreateGoodsRequestBody): Promise<void> {
    try {
      await this.$store.dispatch('goods/registerGoods', {
        body: payload,
        token: this.userToken,
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の登録に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    await this.$router.push(this.$C.PAGE_URL.GOODS);
  }
}
</script>

<style lang="scss">
.contents {
  margin-top: 64px;
}
</style>
