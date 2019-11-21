<template lang="pug">
.page-heading
  h1 {{ title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * ページヘッダタイトル
 * @author kotatanaka
 */
@Component
export default class PageHeading extends Vue {
  @Prop({ type: String, required: true })
  title: string
}
</script>

<style lang="scss">
.page-heading {
  margin-top: 50px;
}
</style>
