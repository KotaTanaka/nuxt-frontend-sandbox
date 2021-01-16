import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import Cookie from 'js-cookie';
import {
  BaseActionTypes,
  BaseGetterTypes,
  BaseMutationTypes,
} from '@/@types/vuex';
import { RootStore } from '@/store';
import { ILoginRequestBody } from '@/interfaces/api/request/User';
import { ILoginResponse } from '@/interfaces/api/response/User';

/** Store */
export interface UserStore {
  userToken: string;
}

/** State */
export const state = (): UserStore => ({
  userToken: '',
});

/** Getters */
export const getters: GetterTree<UserStore, UserStore> = {};
export interface GetterTypes extends BaseGetterTypes {
  // 'user/GetterName': { returnType: GetterReturnType }
}

/** Mutations */
export const mutations: MutationTree<UserStore> = {
  /** ユーザートークンのセット */
  setUserToken(state: UserStore, userToken: string): void {
    state.userToken = userToken;
  },
};
export interface MutationTypes extends BaseMutationTypes {
  'user/setUserToken': { payload: string };
}

/** Actions */
export const actions: ActionTree<UserStore, RootStore> = {
  /** ログイン */
  async signIn(
    { commit }: ActionContext<UserStore, RootStore>,
    payload: { body: ILoginRequestBody },
  ): Promise<void> {
    const response = await this.$axios.$put<ILoginResponse>(
      this.$C.API_ENDPOINT.USER_LOGIN,
      payload.body,
    );

    Cookie.set('user_token', response.loginToken);
    commit('setUserToken', response.loginToken);
  },
};
export interface ActionTypes extends BaseActionTypes {
  'user/signIn': { payload: { body: ILoginRequestBody }; returnType: void };
}
