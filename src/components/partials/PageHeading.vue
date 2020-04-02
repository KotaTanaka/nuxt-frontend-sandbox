<template lang="pug">
.page-heading
  h1 {{ title }}
  Breadcrumb(
    v-if="breadcrumbList.length > 1 && $mq === 'pc'"
    :breadcrumbList="breadcrumbList"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// from app
import Breadcrumb from '@/components/partials/Breadcrumb.vue'
import { IBreadcrumb } from '@/interfaces/app'

/**
 * ページ見出し
 * @author kotatanaka
 */
@Component({
  components: {
    Breadcrumb
  }
})
export default class PageHeading extends Vue {
  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: Array, required: true })
  breadcrumbList: Array<IBreadcrumb>
}
</script>

<style lang="scss">
.page-heading {
  margin-top: 50px;
}
</style>
