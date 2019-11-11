import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

// from app
import { GoodsStore } from './goods'

/** Store */
export interface RootStore {
  $axios: NuxtAxiosInstance
  goods: GoodsStore
}

/** Mutations */
export const mutations: MutationTree<RootStore> = {}

/** Actions */
export const actions: ActionTree<RootStore, RootStore> = {}

/** Getters */
export const getters: GetterTree<RootStore, RootStore> = {}
