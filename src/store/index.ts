import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex';
import { Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import cookieparser from 'cookieparser';
import { GoodsStore } from './goods';
import { UserStore } from './user';

/** Store */
export interface RootStore {
  $axios: NuxtAxiosInstance;
  goods: GoodsStore;
  user: UserStore;
}

/** Mutations */
export const mutations: MutationTree<RootStore> = {};

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

/** Getters */
export const getters: GetterTree<RootStore, RootStore> = {};
