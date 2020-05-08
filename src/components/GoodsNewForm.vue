<template lang="pug">
.goods-new
  v-form(v-model="valid").form
    v-text-field(
      v-model="nameValue"
      :rules="nameRules"
      label="商品名"
      required
    )
    v-text-field(
      v-model="descriptionValue"
      :rules="descriptionRules"
      label="商品説明"
    )
    v-text-field(
      v-model="priceValue"
      :rules="priceRules"
      label="価格"
      required
    )
    v-btn(:disabled="!valid" @click="onClick") 登録
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import { IAPIError } from '@/interfaces/api/response/Error';

/**
 * 商品登録フォーム
 * @author kotatanaka
 */
@Component
export default class GoodsNewForm extends Vue {
  nameValue = '';
  descriptionValue = '';
  priceValue = 0;

  // TODO バリデーション
  valid = true;
  nameRules = [];
  descriptionRules = [];
  priceRules = [];

  async onClick() {
    try {
      await this.$store.dispatch('goods/registerGoods', {
        body: {
          name: this.nameValue,
          description: this.descriptionValue,
          price: this.priceValue,
        },
        token: this.$store.state.user.userToken,
      });
    } catch (err) {
      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の登録に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    this.$router.push(PAGE_URL.GOODS);
  }
}
</script>

<style lang="scss">
.goods-new {
  display: flex;
  justify-content: center;

  > .form {
    width: 360px;
  }
}
</style>
