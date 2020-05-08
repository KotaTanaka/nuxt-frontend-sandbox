import { ActionTree, GetterTree, MutationTree } from 'vuex';
import Cookie from 'js-cookie';

// from app
import { API_ENDPOINT } from '@/constants';
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

/** Mutations */
export const mutations: MutationTree<UserStore> = {
  /** ユーザートークンのセット */
  setUserToken(state: UserStore, userToken: string) {
    state.userToken = userToken;
  },
};

/** Actions */
export const actions: ActionTree<UserStore, RootStore> = {
  /** ログイン */
  async signin(
    { commit },
    payload: { body: ILoginRequestBody },
  ): Promise<void> {
    const response = await this.$axios.$put<ILoginResponse>(
      API_ENDPOINT.USER_LOGIN,
      payload.body,
    );

    Cookie.set('user_token', response.loginToken);
    commit('setUserToken', response.loginToken);
  },
};

/** Getters */
export const getters: GetterTree<UserStore, UserStore> = {};
