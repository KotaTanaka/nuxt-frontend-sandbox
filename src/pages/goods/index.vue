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
import { IGoodsListElement } from '@/interfaces/api/response/Goods';

/**
 * 商品一覧ページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
  middleware: 'authentication',
  components: {
    PageHeading,
    GoodsList,
  },
})
export default class GoodsPage extends Vue {
  async fetch({ store }): Promise<void> {
    await store.dispatch('goods/fetchGoodsList', {
      token: store.state.user.userToken,
    });
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
