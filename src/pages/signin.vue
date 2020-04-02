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
    v-btn(:disabled="!valid" @click="onClick") ログイン
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';

/**
 * ログインページ
 * @author kotatanaka
 */
@Component({
  layout: 'default',
})
export default class SigninPage extends Vue {
  id = '';
  password = '';
  valid = true;

  idRules = [];
  passRules = [];

  async onClick() {
    try {
      await this.$store.dispatch('user/signin', {
        body: {
          id: this.id,
          password: this.password,
        },
      });

      this.$router.push(PAGE_URL.TOP);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
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
