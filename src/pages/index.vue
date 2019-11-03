<template lang="pug">
div
  h1 トップページ
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * トップページ
 * @author kotatanaka
 */
@Component({
  layout: 'default'
})
export default class TopPage extends Vue {}
</script>

<style></style>
