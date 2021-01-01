<template lang="pug">
.breadcrumb
  .breadcrumb-list(v-for="(item, i) in breadcrumbList")
    .breadcrumb-item(:key="i")
      nuxt-link.span(
        v-if="item.path !== $route.path"
        :to="item.path"
      ) {{ item.name }}
      span.span(v-else) {{ item.name }}
      span.span(v-if="i < breadcrumbList.length - 1") >
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { IBreadcrumb } from '@/interfaces/app';

// eslint-disable-next-line no-unused-vars
interface Props {
  breadcrumbList: IBreadcrumb[];
}

/** パンくず */
export default defineComponent({
  props: {
    breadcrumbList: { type: Array, required: true },
  },
});
</script>

<style lang="scss">
.breadcrumb {
  display: flex;
  margin-top: 48px;
  background: white;

  > .breadcrumb-list > .breadcrumb-item > .span {
    margin-right: 8px;
  }
}
</style>
