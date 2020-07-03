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
import ConfirmDialog from '@/components/partials/ConfirmDialog.vue';
import GoodsEditModal from '@/components/GoodsEditModal.vue';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';

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
  async toDatail(): Promise<void> {
    await this.$router.push(
      this.$C.PAGE_URL.GOODS_DETAIL.replace('$id', `${this.goods.id}`),
    );
  }

  /** 商品削除確認 */
  openDeleteModal(): void {
    this.isDeleteModalVisible = true;
  }

  /** 商品情報編集 */
  openEditModal(): void {
    this.isEditModalVisible = true;
  }

  /** 商品削除キャンセル */
  closeDeleteModal(): void {
    this.isDeleteModalVisible = false;
  }

  /** 商品編集キャンセル/完了 */
  closeEditModal(): void {
    this.isEditModalVisible = false;
  }

  /** 商品更新 */
  @Emit('updateGoods')
  updateGoods(): void {
    this.closeEditModal();
  }

  /**
   * 商品削除
   * @return 商品ID
   */
  @Emit('deleteGoods')
  deleteGoods(): number {
    this.closeDeleteModal();
    return this.goods.id;
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
