import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootStore } from '@/store';
import {
  BaseActionTypes,
  BaseGetterTypes,
  BaseMutationTypes,
} from '@/@types/vuex';
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

/** Getters */
export const getters: GetterTree<GoodsStore, GoodsStore> = {};
export interface GetterTypes extends BaseGetterTypes {
  // 'goods/GetterName': { returnType: GetterReturnType }
}

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
export interface MutationTypes extends BaseMutationTypes {
  'goods/setGoodsListingResponse': { payload: IGoodsListingResponse };
  'goods/setGoodsDetailResponse': { payload: IGoodsDetailResponse };
  'goods/setNewGoodsListAfterDelete': { payload: IDeleteGoodsResponse };
}

/** Actions */
export const actions: ActionTree<GoodsStore, RootStore> = {
  /** 商品一覧取得 */
  async fetchGoodsList(
    { commit }: ActionContext<GoodsStore, RootStore>,
    payload: { token: string },
  ): Promise<void> {
    const response = await this.$axios.$get<IGoodsListingResponse>(
      this.$C.API_ENDPOINT.GOODS,
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
    { commit }: ActionContext<GoodsStore, RootStore>,
    payload: { token: string; id: string },
  ): Promise<void> {
    const response = await this.$axios.$get<IGoodsDetailResponse>(
      this.$C.API_ENDPOINT.GOODS_ONE.replace('$1', `${payload.id}`),
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
    _: ActionContext<GoodsStore, RootStore>,
    payload: { token: string; body: ICreateGoodsRequestBody },
  ): Promise<ICreateGoodsResponse> {
    return await this.$axios.$post<ICreateGoodsResponse>(
      this.$C.API_ENDPOINT.GOODS,
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
    _: ActionContext<GoodsStore, RootStore>,
    payload: { token: string; id: string; body: IUpdateGoodsRequestBody },
  ): Promise<IUpdateGoodsResponse> {
    return await this.$axios.$put<IUpdateGoodsResponse>(
      this.$C.API_ENDPOINT.GOODS_ONE.replace('$1', `${payload.id}`),
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
    { commit }: ActionContext<GoodsStore, RootStore>,
    payload: { token: string; id: string },
  ): Promise<IDeleteGoodsResponse> {
    const response = await this.$axios.$delete<IDeleteGoodsResponse>(
      this.$C.API_ENDPOINT.GOODS_ONE.replace('$1', `${payload.id}`),
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );

    commit('setNewGoodsListAfterDelete', response);

    return response;
  },
};
export interface ActionTypes extends BaseActionTypes {
  'goods/fetchGoodsList': { payload: { token: string }; returnType: void };
  'goods/fetchGoodsDetail': {
    payload: { token: string; id: string };
    returnType: void;
  };
  'goods/registerGoods': {
    payload: { token: string; body: ICreateGoodsRequestBody };
    returnType: ICreateGoodsResponse;
  };
  'goods/updateGoods': {
    payload: { token: string; id: string; body: IUpdateGoodsRequestBody };
    returnType: IUpdateGoodsResponse;
  };
  'goods/deleteGoods': {
    payload: { token: string; id: string };
    returnType: IDeleteGoodsResponse;
  };
}
