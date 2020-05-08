<template lang="pug">
.error-page
  h1.heading ERROR ({{ error.statusCode }})
  .message {{ error.message }}
  .route Page - {{ error.path }}
  .links
    a(:href="$route.path") 再読み込み
    a(href="/") トップページ
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types';
import { Component, Prop, Vue } from 'nuxt-property-decorator';

/**
 * エラーページ
 * @author kotatanaka
 */
@Component
export default class ErrorPage extends Vue {
  @Prop({ type: Object, required: true })
  error: NuxtError;
}
</script>

<style lang="scss">
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .heading {
    margin: 64px auto 32px;
    color: darkred;
  }

  & > .message {
    width: 80%;
    padding: 16px;
    background-color: whitesmoke;
    border-radius: 12px;
  }

  & > .route {
    margin-top: 24px;
  }

  & > .links {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
  }
}
</style>
