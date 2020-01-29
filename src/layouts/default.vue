<template lang="pug">
v-app
  AppHeader
  .app-container
    nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '@/components/partials/AppHeader.vue'

/**
 * デフォルトレイアウト
 * @author kotatanaka
 */
@Component({
  components: {
    AppHeader
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss">
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
