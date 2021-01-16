import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import { Context } from '@nuxt/types';
import cookieparser from 'cookieparser';
import * as goods from '@/store/goods';
import * as user from '@/store/user';

/** Store */
export interface RootStore {
  goods: goods.GoodsStore;
  user: user.UserStore;
}

/** Getters */
export const getters: GetterTree<RootStore, RootStore> = {};
export type RootGetterTypes = goods.GetterTypes & user.GetterTypes;

/** Mutations */
export const mutations: MutationTree<RootStore> = {};
export type RootMutationTypes = goods.MutationTypes & user.MutationTypes;

/** Actions */
export const actions: ActionTree<RootStore, RootStore> = {
  nuxtServerInit(
    { commit }: ActionContext<RootStore, RootStore>,
    { req }: Context,
  ): void {
    if (req.headers.cookie) {
      const parsedCookie = cookieparser.parse(req.headers.cookie);
      try {
        const userToken = parsedCookie.user_token;
        commit('user/setUserToken', userToken);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  },
};
export type RootActionTypes = goods.ActionTypes & user.ActionTypes;
