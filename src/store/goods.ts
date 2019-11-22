import { ActionTree, GetterTree, MutationTree } from 'vuex'

// from app
import { API_ENDPOINT } from '@/constants'
import { RootStore } from '@/store'
import {
  IGoodsListElement,
  IGoodsListingResponse,
  IGoodsDetailResponse
} from '@/interfaces/api/Goods'

/** Store */
export interface GoodsStore {
  /** 商品総数 */
  total: number
  /** 商品リスト */
  goodsList: Array<IGoodsListElement>
  /** 商品詳細 */
  goods: IGoodsDetailResponse
}

/** State */
export const state = (): GoodsStore => ({
  total: 0,
  goodsList: [],
  goods: {
    id: 0,
    name: '',
    description: '',
    price: 0,
    createdAt: '',
    updatedAt: ''
  }
})

/** Mutations */
export const mutations: MutationTree<GoodsStore> = {
  /** 商品一覧データのセット */
  setGoodsListingResponse(state: GoodsStore, response: IGoodsListingResponse) {
    state.total = response.total
    state.goodsList = response.goodsList
  },
  /** 商品詳細データのセット */
  setGoodsDetailResponse(state: GoodsStore, response: IGoodsDetailResponse) {
    state.goods = response
  }
}

/** Actions */
export const actions: ActionTree<GoodsStore, RootStore> = {
  /** 商品一覧取得 */
  async fetchGoodsList({ commit }, payload: { token: string }): Promise<void> {
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
  },

  /** 商品詳細取得 */
  async fetchGoodsDetail(
    { commit },
    payload: { token: string; id: string }
  ): Promise<void> {
    try {
      const response = await this.$axios.$get<IGoodsDetailResponse>(
        API_ENDPOINT.GOODS_ONE.replace('$1', payload.id),
        {
          headers: {
            Authorization: `Bearer ${payload.token}`
          }
        }
      )
      commit('setGoodsDetailResponse', response)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

/** Getters */
export const getters: GetterTree<GoodsStore, GoodsStore> = {}
