<template lang="pug">
.page-container
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
  getCurrentInstance,
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
  setup() {
    const root = getCurrentInstance();

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品登録', path: root.$route.path },
      ];
    });

    /**
     * 商品登録
     * @param body リクエストボディ
     */
    const registerGoods = async (body: ICreateGoodsRequestBody) => {
      try {
        await root.$typedStore.dispatch<'goods/registerGoods'>(
          'goods/registerGoods',
          {
            body,
            token: root.$typedStore.state.user.userToken,
          },
        );
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
@import 'resources';

.page-container {
  @include page-container;

  > .contents {
    margin-top: 64px;
  }
}
</style>
