<template lang="pug">
v-container
  PageHeading(
    title="商品一覧"
    :breadcrumbList="breadcrumbList"
  )
  GoodsList(
    @updateGoods="updateGoods"
    @deleteGoods="deleteGoods"
  )
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  SetupContext,
} from '@nuxtjs/composition-api';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsList from '@/components/GoodsList.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

/** 商品一覧ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsList,
  },
  middleware: 'authentication',
  setup(_, { root }: SetupContext) {
    /** トークン */
    const userToken = computed<string>(() => {
      return root.$typedStore.state.user.userToken;
    });

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品一覧', path: root.$route.path },
      ];
    });

    /** ライフサイクル */
    onBeforeMount(async () => {
      await fetchGoods();
    });

    /** 商品一覧取得 */
    const fetchGoods = async () => {
      try {
        await root.$store.dispatch('goods/fetchGoodsList', {
          token: userToken.value,
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        root.$nuxt.error({
          message: `商品の取得に失敗しました: ${errData.message}`,
          path: root.$route.path,
          statusCode: status,
        });
      }
    };

    /**
     * 商品更新
     * @param payload.id 商品ID
     * @param payload.body リクエストボディ
     */
    const updateGoods = async (id: number, body: IUpdateGoodsRequestBody) => {
      try {
        await root.$store.dispatch('goods/updateGoods', {
          token: userToken.value,
          id,
          body,
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        root.$nuxt.error({
          message: `商品情報の更新に失敗しました: ${errData.message}`,
          path: root.$route.path,
          statusCode: status,
        });

        return;
      }

      // 一覧の再取得
      await fetchGoods();
    };

    /**
     * 商品削除
     * @param id 商品ID
     */
    const deleteGoods = async (id: number) => {
      try {
        await root.$store.dispatch('goods/deleteGoods', {
          token: userToken.value,
          id,
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        root.$nuxt.error({
          message: `商品の削除に失敗しました: ${errData.message}`,
          path: root.$route.path,
          statusCode: status,
        });
      }
    };

    return {
      userToken,
      breadcrumbList,
      updateGoods,
      deleteGoods,
    };
  },
});
</script>

<style lang="scss"></style>
