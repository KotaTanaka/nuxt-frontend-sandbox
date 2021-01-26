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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
} from '@nuxtjs/composition-api';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsDetailTable from '@/components/GoodsDetailTable.vue';
import { IBreadcrumb } from '@/interfaces/app';
import { IAPIError } from '@/interfaces/api/response/Error';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/** 商品詳細ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsDetailTable,
  },
  middleware: 'authentication',
  setup() {
    const root = getCurrentInstance();

    /** 商品データ */
    const goods = computed<IGoodsDetailResponse>(() => {
      return root.$typedStore.state.goods.goods;
    });

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品一覧', path: root.$C.PAGE_URL.GOODS },
        { name: goods.value.name, path: root.$route.path },
      ];
    });

    /** ライフサイクル */
    onBeforeMount(async () => {
      await fetchGoodsDetail();
    });

    /** 商品詳細取得 */
    const fetchGoodsDetail = async () => {
      try {
        await root.$typedStore.dispatch<'goods/fetchGoodsDetail'>(
          'goods/fetchGoodsDetail',
          {
            token: root.$typedStore.state.user.userToken,
            id: root.$route.params.id,
          },
        );
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

    return {
      breadcrumbList,
    };
  },
});
</script>

<style lang="scss"></style>
