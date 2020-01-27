<template lang="pug">
v-card(min-width="300").item
  v-card-text(@click="toDateil").content
    div 商品ID: {{ goods.id }}
    p(class="display-1 text--primary") {{ goods.name }}
    p {{ goods.price }} 円
    div(class="text--primary") {{ goods.description }}
  v-card-actions
    v-btn(text) 編集
    v-btn(text @click.native.stop="openDeleteModal") 削除
    ConfirmDialog(
      :dialog="isDeleteModalVisible"
      title="商品の削除"
      message="本当に削除しますか？"
      @close="closeDeleteModal"
      @submit="deleteGoods"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PAGE_URL } from '@/constants'

// from app
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { IGoodsListElement } from '@/interfaces/api/response/Goods'

/**
 * 商品リスト要素
 * @author kotatanaka
 */
@Component({
  components: {
    ConfirmDialog
  }
})
export default class GoodsListItem extends Vue {
  @Prop({ type: Object, required: true })
  goods: IGoodsListElement

  isDeleteModalVisible = false

  /** 詳細画面への遷移 */
  toDateil() {
    this.$router.push(PAGE_URL.GOODS_DETAIL.replace('$id', `${this.goods.id}`))
  }

  /** 商品削除確認 */
  openDeleteModal() {
    this.isDeleteModalVisible = true
  }

  /** 商品削除キャンセル */
  closeDeleteModal() {
    this.isDeleteModalVisible = false
  }

  /** 商品削除の実行 */
  async deleteGoods() {
    try {
      await this.$store.dispatch('goods/deleteGoods', {
        token: this.$store.state.user.userToken,
        id: this.goods.id
      })

      this.isDeleteModalVisible = false
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
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
