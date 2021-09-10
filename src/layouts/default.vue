<template lang="pug">
v-app
  AppHeader
  .app-container
    nuxt
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import AppHeader from '@/components/partials/AppHeader.vue';

/** デフォルトレイアウト */
export default defineComponent({
  components: {
    AppHeader,
  },
});
</script>

<style lang="scss">
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>
