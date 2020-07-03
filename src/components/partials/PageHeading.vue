<template lang="pug">
.page-heading
  h1(v-if="$mq === 'pc'") {{ title }}
  h2(v-else) {{ title }}
  Breadcrumb(
    v-if="breadcrumbList.length > 1 && $mq === 'pc'"
    :breadcrumbList="breadcrumbList"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

// from app
import Breadcrumb from '@/components/partials/Breadcrumb.vue';
import { IBreadcrumb } from '@/interfaces/app';

/**
 * ページ見出し
 * @author kotatanaka
 */
@Component({
  components: {
    Breadcrumb,
  },
})
export default class PageHeading extends Vue {
  /** ページタイトル */
  @Prop({ type: String, required: true })
  title: string;

  /** パンくずリスト */
  @Prop({ type: Array, required: true })
  breadcrumbList: IBreadcrumb[];
}
</script>

<style lang="scss">
@import '@/assets/styles/resources';

.page-heading {
  color: $text;
  width: 100%;
  margin-top: 64px;
}
</style>
