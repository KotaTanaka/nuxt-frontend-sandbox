<template lang="pug">
.page-container
  PageHeading(
    title="商品一覧"
    :breadcrumbList="breadcrumbList"
  )
  GoodsList(
    @updateGoods="updateGoodsWithReload"
    @deleteGoods="deleteGoods"
  )
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
} from '@nuxtjs/composition-api';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsList from '@/components/GoodsList.vue';
import useGoods from '@/composables/useGoods';
import { IBreadcrumb } from '@/interfaces/app';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';

/** 商品一覧ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsList,
  },
  middleware: 'authentication',
  setup() {
    const root = getCurrentInstance();
    const { fetchGoodsList, updateGoods, deleteGoods } = useGoods();

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品一覧', path: root.$route.path },
      ];
    });

    /** ライフサイクル */
    onBeforeMount(async () => {
      await fetchGoodsList();
    });

    /**
     * 商品更新
     * @param {number} id 商品ID
     * @param {IUpdateGoodsRequestBody} body リクエストボディ
     */
    const updateGoodsWithReload = async (
      id: number,
      body: IUpdateGoodsRequestBody,
    ) => {
      await updateGoods(id, body);

      // 一覧を更新
      await fetchGoodsList();
    };

    return {
      breadcrumbList,
      deleteGoods,
      updateGoodsWithReload,
    };
  },
});
</script>

<style lang="scss">
@import 'resources';

.page-container {
  @include page-container;
}
</style>
