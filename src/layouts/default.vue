<template lang="pug">
.app
  AppHeader
  nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppHeader from '@/components/common/AppHeader.vue'

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
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
