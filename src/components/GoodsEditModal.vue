<template lang="pug">
v-dialog(v-model="dialog" persistent max-width="640")
  v-card.goods-edit
    v-card-title(class="headline") 商品情報編集
    v-card-text
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
    v-card-actions
      v-spacer
      v-btn(@click="onClickCancel") キャンセル
      v-btn(:disabled="!valid" color="green" @click="onClickUpdate") 更新
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

// from app
import { IAPIError } from '@/interfaces/api/response/Error';
import { IGoodsDetailResponse } from '@/interfaces/api/response/Goods';

/**
 * 商品編集モーダル
 * @author kotatanaka
 */
@Component
export default class GoodsEditModal extends Vue {
  @Prop({ type: Boolean, required: true })
  dialog: boolean;

  @Prop({ type: Object, required: true })
  goods: IGoodsDetailResponse;

  nameValue = '';
  descriptionValue = '';
  priceValue = 0;

  // TODO バリデーション
  valid = true;
  nameRules = [];
  descriptionRules = [];
  priceRules = [];

  /** フォームの初期値に現在値をセット */
  mounted() {
    this.nameValue = this.goods.name;
    this.descriptionValue = this.goods.description;
    this.priceValue = this.goods.price;
  }

  @Emit('close')
  onClickCancel() {}

  /** 一覧の再取得  */
  async reload() {
    try {
      await this.$store.dispatch('goods/fetchGoodsList', {
        token: this.$store.state.user.userToken,
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の取得に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });
    }
  }

  /** 更新実行 */
  async onClickUpdate() {
    try {
      await this.$store.dispatch('goods/updateGoods', {
        token: this.$store.state.user.userToken,
        id: this.goods.id,
        body: {
          name: this.nameValue !== this.goods.name ? this.nameValue : undefined,
          description:
            this.descriptionValue !== this.goods.description
              ? this.descriptionValue
              : undefined,
          price:
            this.priceValue !== this.goods.price ? this.priceValue : undefined,
        },
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品情報の更新に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    await this.reload();
    this.$emit('close');
  }
}
</script>

<style lang="scss">
.goods-edit {
  padding: 16px;
}
</style>
