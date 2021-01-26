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
import { defineComponent } from '@nuxtjs/composition-api';
import Breadcrumb from '@/components/partials/Breadcrumb.vue';
import { IBreadcrumb } from '@/interfaces/app';

// eslint-disable-next-line no-unused-vars
interface Props {
  title: string;
  breadcrumbList: IBreadcrumb[];
}

/** ページ見出し */
export default defineComponent({
  components: {
    Breadcrumb,
  },
  props: {
    title: { type: String, required: true },
    breadcrumbList: { type: Array, required: true },
  },
});
</script>

<style lang="scss">
@import 'resources';

.page-heading {
  color: $text;
  width: 100%;
  margin-top: $pc-header-height + 64px;

  @include sp {
    margin-top: $sp-header-height + 32px;
  }
}
</style>
