<template lang="pug">
.page-container
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
import useGoods from '@/composables/useGoods';
import { IBreadcrumb } from '@/interfaces/app';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/** 商品詳細ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsDetailTable,
  },
  middleware: 'authentication',
  setup() {
    const { proxy } = getCurrentInstance();
    const { fetchGoodsDetail } = useGoods();

    /** 商品データ */
    const goods = computed<IGoodsDetailResponse>(() => {
      return proxy.$typedStore.state.goods.goods;
    });

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: proxy.$C.PAGE_URL.TOP },
        { name: '商品一覧', path: proxy.$C.PAGE_URL.GOODS },
        { name: goods.value.name, path: '' },
      ];
    });

    /** ライフサイクル */
    onBeforeMount(async () => {
      await fetchGoodsDetail();
    });

    return {
      breadcrumbList,
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
