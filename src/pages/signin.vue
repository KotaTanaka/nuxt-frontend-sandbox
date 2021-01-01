<template lang="pug">
.signin-page
  v-form(v-model="valid").form
    v-text-field(
      v-model="formState.id"
      :rules="idRules"
      label="ID"
      required
    )
    v-text-field(
      v-model="formState.password"
      :rules="passRules"
      label="パスワード"
      required
    )
    v-btn(:disabled="!valid" @click="signIn") ログイン
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api';
import { IAPIError } from '@/interfaces/api/response/Error';

/** ログインページ */
export default defineComponent({
  setup(_, { root }: SetupContext) {
    const formState = reactive<{ id: string; password: string }>({
      id: '',
      password: '',
    });

    // TODO バリデーション
    const valid = ref<boolean>(true);
    const idRules = [];
    const passRules = [];

    /** ログイン */
    const signIn = async () => {
      try {
        await root.$store.dispatch('user/signIn', {
          body: {
            id: formState.id,
            password: formState.password,
          },
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        root.$nuxt.error({
          message: `ログインに失敗しました: ${errData.message}`,
          path: root.$route.path,
          statusCode: status,
        });

        return;
      }

      await root.$router.push(root.$C.PAGE_URL.TOP);
    };

    return {
      formState,
      valid,
      idRules,
      passRules,
      signIn,
    };
  },
});
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
