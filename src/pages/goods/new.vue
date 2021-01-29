<template lang="pug">
.page-container
  PageHeading(
    title="商品登録"
    :breadcrumbList="breadcrumbList"
  )
  .contents
    GoodsNewForm(@submit="registerGoodsAndBack")
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
} from '@nuxtjs/composition-api';
import PageHeading from '@/components/partials/PageHeading.vue';
import GoodsNewForm from '@/components/GoodsNewForm.vue';
import useGoods from '@/composables/useGoods';
import { IBreadcrumb } from '@/interfaces/app';
import { ICreateGoodsRequestBody } from '@/interfaces/api/request/Goods';

/** 商品登録ページ */
export default defineComponent({
  components: {
    PageHeading,
    GoodsNewForm,
  },
  middleware: 'authentication',
  setup() {
    const root = getCurrentInstance();
    const { registerGoods } = useGoods();

    /** パンくず */
    const breadcrumbList = computed<IBreadcrumb[]>(() => {
      return [
        { name: 'トップ', path: root.$C.PAGE_URL.TOP },
        { name: '商品登録', path: root.$route.path },
      ];
    });

    /**
     * 商品登録
     * @param {ICreateGoodsRequestBody} body リクエストボディ
     */
    const registerGoodsAndBack = async (body: ICreateGoodsRequestBody) => {
      await registerGoods(body);

      // 一覧ページに遷移
      await root.$router.push(root.$C.PAGE_URL.GOODS);
    };

    return {
      breadcrumbList,
      registerGoodsAndBack,
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
