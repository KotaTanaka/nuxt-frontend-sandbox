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
import { Component, Vue } from 'nuxt-property-decorator'

/**
 * ログインページ
 * @author kotatanaka
 */
@Component({
  layout: 'default'
})
export default class SigninPage extends Vue {
  id = ''
  password = ''
  valid = true

  idRules = []
  passRules = []

  onClick() {}
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
