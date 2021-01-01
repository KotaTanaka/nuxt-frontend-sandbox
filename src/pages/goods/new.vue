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
import {
  computed,
  defineComponent,
  SetupContext,
} from '@nuxtjs/composition-api';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsNewForm from '@/components/GoodsNewForm.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { ICreateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

/** 商品登録ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsNewForm,
  },
  middleware: 'authentication',
  setup(_, { root }: SetupContext) {
    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品登録', path: root.$route.path },
      ];
    });

    /**
     * 商品登録
     * @param payload リクエストボディ
     */
    const registerGoods = async (payload: ICreateGoodsRequestBody) => {
      try {
        await root.$store.dispatch('goods/registerGoods', {
          body: payload,
          token: root.$typedStore.state.user.userToken,
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        root.$nuxt.error({
          message: `商品の登録に失敗しました: ${errData.message}`,
          path: root.$route.path,
          statusCode: status,
        });

        return;
      }

      await root.$router.push(root.$C.PAGE_URL.GOODS);
    };

    return {
      breadcrumbList,
      registerGoods,
    };
  },
});
</script>

<style lang="scss">
.contents {
  margin-top: 64px;
}
</style>
