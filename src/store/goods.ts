import { ActionTree, GetterTree, MutationTree } from 'vuex'

// from app
import { API_ENDPOINT } from '@/constants/url'
import { RootStore } from '@/store'
import {
  IGoodsListElement,
  IGoodsListingResponse
} from '@/interfaces/api/Goods'

/** Store */
export interface GoodsStore {
  /** 商品総数 */
  total: number
  /** 商品リスト */
  goodsList: Array<IGoodsListElement>
}

/** State */
export const state = (): GoodsStore => ({
  total: 0,
  goodsList: []
})

/** Mutations */
export const mutations: MutationTree<GoodsStore> = {
  setGoodsListingResponse(state: GoodsStore, response: IGoodsListingResponse) {
    state.total = response.total
    state.goodsList = response.goodsList
  }
}

/** Actions */
export const actions: ActionTree<GoodsStore, RootStore> = {
  /** 商品一覧取得 */
  async fetchGoodsList({ commit }, payload: { token }): Promise<void> {
    try {
      const response = await this.$axios.$get<IGoodsListingResponse>(
        API_ENDPOINT.GOODS,
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      commit('setGoodsListingResponse', response)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

/** Getters */
export const getters: GetterTree<GoodsStore, GoodsStore> = {}
