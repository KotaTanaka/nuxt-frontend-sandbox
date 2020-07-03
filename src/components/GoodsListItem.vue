<template lang="pug">
v-card(min-width="300").item
  v-card-text(@click="toDatail").content
    div 商品ID: {{ goods.id }}
    p(class="display-1 text--primary") {{ goods.name }}
    p {{ goods.price }} 円
    div(class="text--primary") {{ goods.description }}
  v-card-actions
    v-btn(text @click.native.stop="openEditModal") 編集
    v-btn(text @click.native.stop="openDeleteModal") 削除
  GoodsEditModal(
    :dialog="isEditModalVisible"
    :goods="goods"
    @submit="updateGoods"
    @cancel="closeEditModal"
  )
  ConfirmDialog(
    :dialog="isDeleteModalVisible"
    title="商品の削除"
    message="本当に削除しますか？"
    label="削除"
    @submit="deleteGoods"
    @cancel="closeDeleteModal"
  )
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

// from app
import { PAGE_URL } from '@/constants';
import ConfirmDialog from '@/components/partials/ConfirmDialog.vue';
import GoodsEditModal from '@/components/GoodsEditModal.vue';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';
import { IAPIError } from '@/interfaces/api/response/Error';

/**
 * 商品リスト要素
 * @author kotatanaka
 */
@Component({
  components: {
    ConfirmDialog,
    GoodsEditModal,
  },
})
export default class GoodsListItem extends Vue {
  /** 商品情報 */
  @Prop({ type: Object, required: true })
  goods: IGoodsListElement;

  /** 削除確認ダイアログの開閉状態 */
  isDeleteModalVisible = false;

  /** 商品編集モーダルの開閉状態 */
  isEditModalVisible = false;

  /** 詳細画面への遷移 */
  toDatail() {
    this.$router.push(PAGE_URL.GOODS_DETAIL.replace('$id', `${this.goods.id}`));
  }

  /** 商品削除確認 */
  openDeleteModal() {
    this.isDeleteModalVisible = true;
  }

  /** 商品情報編集 */
  openEditModal() {
    this.isEditModalVisible = true;
  }

  /** 商品削除キャンセル */
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }

  /** 商品編集キャンセル/完了 */
  closeEditModal() {
    this.isEditModalVisible = false;
  }

  /** 商品更新 */
  @Emit('updateGoods')
  updateGoods(): void {
    this.closeEditModal();
  }

  /** 商品削除の実行 */
  async deleteGoods() {
    try {
      await this.$store.dispatch('goods/deleteGoods', {
        token: this.$store.state.user.userToken,
        id: this.goods.id,
      });
    } catch (err) {
      if (!err.response) throw err;

      const { status, ...errResponse } = err.response;
      const errData = errResponse.data as IAPIError;

      this.$nuxt.error({
        message: `商品の削除に失敗しました: ${errData.message}`,
        path: this.$route.path,
        statusCode: status,
      });

      return;
    }

    this.isDeleteModalVisible = false;
  }
}
</script>

<style lang="scss">
.item {
  > .content {
    cursor: pointer;
  }
}
</style>
