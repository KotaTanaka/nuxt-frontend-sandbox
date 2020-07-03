import { ActionTree, GetterTree, MutationTree } from 'vuex';

// from app
import { API_ENDPOINT } from '@/constants';
import { RootStore } from '@/store';
import {
  ICreateGoodsRequestBody,
  IUpdateGoodsRequestBody,
} from '@/interfaces/api/request/Goods';
import {
  IGoodsListElement,
  IGoodsListingResponse,
  IGoodsDetailResponse,
  ICreateGoodsResponse,
  IUpdateGoodsResponse,
  IDeleteGoodsResponse,
} from '@/interfaces/api/response/Goods';

/** Store */
export interface GoodsStore {
  /** 商品総数 */
  total: number;
  /** 商品リスト */
  goodsList: IGoodsListElement[];
  /** 商品詳細 */
  goods: IGoodsDetailResponse;
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
    updatedAt: '',
  },
});

/** Mutations */
export const mutations: MutationTree<GoodsStore> = {
  /** 商品一覧データのセット */
  setGoodsListingResponse(
    state: GoodsStore,
    response: IGoodsListingResponse,
  ): void {
    state.total = response.total;
    state.goodsList = response.goodsList;
  },
  /** 商品詳細データのセット */
  setGoodsDetailResponse(
    state: GoodsStore,
    response: IGoodsDetailResponse,
  ): void {
    state.goods = response;
  },
  /** 商品削除後の一覧更新 */
  setNewGoodsListAfterDelete(
    state: GoodsStore,
    response: IDeleteGoodsResponse,
  ): void {
    state.goodsList = state.goodsList.filter(
      (goods) => goods.id !== response.id,
    );
  },
};

/** Actions */
export const actions: ActionTree<GoodsStore, RootStore> = {
  /** 商品一覧取得 */
  async fetchGoodsList({ commit }, payload: { token: string }): Promise<void> {
    const response = await this.$axios.$get<IGoodsListingResponse>(
      API_ENDPOINT.GOODS,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
    commit('setGoodsListingResponse', response);
  },

  /** 商品詳細取得 */
  async fetchGoodsDetail(
    { commit },
    payload: { token: string; id: string },
  ): Promise<void> {
    const response = await this.$axios.$get<IGoodsDetailResponse>(
      API_ENDPOINT.GOODS_ONE.replace('$1', payload.id),
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
    commit('setGoodsDetailResponse', response);
  },

  /** 商品登録 */
  async registerGoods(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit },
    payload: { token: string; body: ICreateGoodsRequestBody },
  ): Promise<void> {
    await this.$axios.$post<ICreateGoodsResponse>(
      API_ENDPOINT.GOODS,
      payload.body,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  },

  /** 商品編集 */
  async updateGoods(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { commit },
    payload: { token: string; id: string; body: IUpdateGoodsRequestBody },
  ): Promise<void> {
    await this.$axios.$put<IUpdateGoodsResponse>(
      API_ENDPOINT.GOODS_ONE.replace('$1', payload.id),
      payload.body,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  },

  /** 商品削除 */
  async deleteGoods(
    { commit },
    payload: { token: string; id: string },
  ): Promise<void> {
    const response = await this.$axios.$delete<IDeleteGoodsResponse>(
      API_ENDPOINT.GOODS_ONE.replace('$1', payload.id),
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );

    commit('setNewGoodsListAfterDelete', response);
  },
};

/** Getters */
export const getters: GetterTree<GoodsStore, GoodsStore> = {};
