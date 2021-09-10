<template lang="pug">
.page-heading
  h1(v-if="$mq === 'pc'") {{ title }}
  h2(v-else) {{ title }}
  AppBreadcrumbs(
    v-if="breadcrumbList.length > 1 && $mq === 'pc'"
    :breadcrumbList="breadcrumbList"
  )
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppBreadcrumbs from '@/components/partials/AppBreadcrumbs.vue';
import { IBreadcrumb } from '@/interfaces/app';

// eslint-disable-next-line no-unused-vars
interface Props {
  title: string;
  breadcrumbList: IBreadcrumb[];
}

/** ページ見出し */
export default defineComponent({
  components: {
    AppBreadcrumbs,
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
  width: 100%;
  margin-bottom: 32px;
  color: $text;
}
</style>
