<template lang="pug">
.signin-page
  v-form(v-model="valid").form
    v-text-field(
      v-model="id"
      :rules="idRules"
      label="ID"
      required
    )
    v-text-field(
      v-model="password"
      :rules="passRules"
      label="パスワード"
      required
    )
    v-btn(:disabled="!valid" @click="signIn") ログイン
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import { IAPIError } from '@/interfaces/api/response/Error';

/**
 * ログインページ
 * @author kotatanaka
 */
@Component
export default class SigninPage extends Vue {
  /** ID */
  id = '';

  /** パスワード */
  password = '';

  // TODO バリデーション
  valid = true;
  idRules = [];
  passRules = [];

  /** ログイン */
  async signIn(): Promise<void> {
    try {
      await this.$store.dispatch('user/signin', {
        body: {
          id: this.id,
          password: this.password,
        },
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `ログインに失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    this.$router.push(PAGE_URL.TOP);
  }
}
</script>

<style lang="scss">
.signin-page {
  display: flex;
  justify-content: center;
  margin-top: 64px;

  > .form {
    width: 360px;
  }
}
</style>
