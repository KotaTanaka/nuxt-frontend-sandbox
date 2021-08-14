<template lang="pug">
v-card(min-width="300").item
  v-card-text(@click="toDetail").content
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
import {
  defineComponent,
  getCurrentInstance,
  ref,
  SetupContext,
} from '@nuxtjs/composition-api';
import ConfirmDialog from '@/components/partials/ConfirmDialog.vue';
import GoodsEditModal from '@/components/GoodsEditModal.vue';
import { IUpdateGoodsRequestBody } from '@/interfaces/api/request/Goods';
import { IGoodsListElement } from '@/interfaces/api/response/Goods';

interface Props {
  goods: IGoodsListElement;
}

/** 商品リスト要素 */
export default defineComponent({
  components: {
    ConfirmDialog,
    GoodsEditModal,
  },
  props: {
    goods: { type: Object, required: true },
  },
  setup(props: Props, { emit }: SetupContext) {
    const { proxy } = getCurrentInstance();

    /** 削除確認ダイアログの開閉状態 */
    const isDeleteModalVisible = ref<boolean>(false);

    /** 商品編集モーダルの開閉状態 */
    const isEditModalVisible = ref<boolean>(false);

    /** 詳細画面への遷移 */
    const toDetail = async () => {
      await proxy.$router.push(
        proxy.$C.PAGE_URL.GOODS_DETAIL.replace('$id', `${props.goods.id}`),
      );
    };

    /** 商品削除確認 */
    const openDeleteModal = () => (isDeleteModalVisible.value = true);

    /** 商品情報編集 */
    const openEditModal = () => (isEditModalVisible.value = true);

    /** 商品削除キャンセル */
    const closeDeleteModal = () => (isDeleteModalVisible.value = false);

    /** 商品編集キャンセル/完了 */
    const closeEditModal = () => (isEditModalVisible.value = false);

    /** 商品更新 */
    const updateGoods = (id: number, body: IUpdateGoodsRequestBody) => {
      emit('updateGoods', id, body);
      closeEditModal();
    };

    /** 商品削除 */
    const deleteGoods = () => {
      emit('deleteGoods', props.goods.id);
      closeDeleteModal();
    };

    return {
      isDeleteModalVisible,
      isEditModalVisible,
      toDetail,
      openDeleteModal,
      openEditModal,
      closeDeleteModal,
      closeEditModal,
      updateGoods,
      deleteGoods,
    };
  },
});
</script>

<style lang="scss">
.item {
  > .content {
    cursor: pointer;
  }
}
</style>
