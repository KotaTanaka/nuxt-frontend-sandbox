<template lang="pug">
.breadcrumb
  .breadcrumb-list(v-for="(item, i) in breadcrumbList")
    .breadcrumb-item(:key="i")
      nuxt-link.span(v-if="item.path !== $route.path" :to="item.path") {{ item.name }}
      span.span(v-else) {{ item.name }}
      span.span(v-if="i < breadcrumbList.length - 1") >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// from app
import { IBreadcrumb } from '@/interfaces/app'

/**
 * パンくず
 * @author kotatanaka
 */
@Component
export default class Breadcrumb extends Vue {
  @Prop({ type: Array, required: true })
  breadcrumbList: Array<IBreadcrumb>
}
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
