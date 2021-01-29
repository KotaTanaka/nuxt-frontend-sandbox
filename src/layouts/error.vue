<template lang="pug">
.page-container
  h1.heading ERROR ({{ error.statusCode }})
  .message {{ error.message }}
  .links
    a(v-if="error.path" :href="error.path") ページに戻る
    a(href="/") トップ
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { NuxtError } from '@nuxt/types';

// eslint-disable-next-line no-unused-vars
interface Props {
  error: NuxtError;
}

/** エラーページ */
export default defineComponent({
  props: {
    error: { type: Object, required: true },
  },
});
</script>

<style lang="scss">
@import 'resources';

.page-container {
  @include page-container;

  display: flex;
  flex-direction: column;
  align-items: center;

  > .heading {
    color: darkred;
  }

  > .message {
    width: 80%;
    padding: 16px;
    margin-top: 32px;
    background: whitesmoke;
    border-radius: 12px;
  }

  > .links {
    margin-top: 24px;
  }
}
</style>
