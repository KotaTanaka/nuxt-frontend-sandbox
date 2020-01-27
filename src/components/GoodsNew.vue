<template lang="pug">
.goods-new
  v-form(v-model="valid").form
    v-text-field(
      v-model="name"
      :rules="nameRules"
      label="商品名"
      required
    )
    v-text-field(
      v-model="description"
      :rules="descriptionRules"
      label="商品説明"
    )
    v-text-field(
      v-model="price"
      :rules="priceRules"
      label="価格"
      required
    )
    v-btn(:disabled="!valid" @click="onClick") 登録
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PAGE_URL } from '@/constants'

/**
 * 商品登録カード
 * @author kotatanaka
 */
@Component({
  layout: 'default'
})
export default class GoodsNew extends Vue {
  name = ''
  description = ''
  price = 0
  valid = true

  nameRules = []
  descriptionRules = []
  priceRules = []

  async onClick() {
    try {
      await this.$store.dispatch('goods/registerGoods', {
        body: {
          name: this.name,
          description: this.description,
          price: this.price
        },
        token: this.$store.state.user.userToken
      })

      this.$router.push(PAGE_URL.GOODS)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
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
