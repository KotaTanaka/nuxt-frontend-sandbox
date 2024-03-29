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
  getCurrentInstance,
  reactive,
  ref,
} from '@nuxtjs/composition-api';
import { ILoginRequestBody } from '@/interfaces/api/request/User';
import { IAPIError } from '@/interfaces/api/response/Error';

/** ログインページ */
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();

    /** 入力値 */
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
      const body: ILoginRequestBody = {
        id: formState.id,
        password: formState.password,
      };

      try {
        await proxy.$typedStore.dispatch<'user/signIn'>('user/signIn', {
          body,
        });
      } catch (err) {
        if (!err.response) throw err;

        const { status, ...errResponse } = err.response;
        const errData = errResponse.data as IAPIError;

        proxy.$nuxt.error({
          message: `ログインに失敗しました: ${errData.message}`,
          path: proxy.$route.path,
          statusCode: status,
        });

        return;
      }

      await proxy.$router.push(proxy.$C.PAGE_URL.TOP);
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
