import { ActionTree, GetterTree, MutationTree } from 'vuex'

// from app
import { API_ENDPOINT } from '@/constants'
import { RootStore } from '@/store'
import { ILoginRequestBody } from '@/interfaces/api/request/User'
import { ILoginResponse } from '@/interfaces/api/response/User'

/** Store */
export interface UserStore {
  userId: string
  userToken: string
}

/** State */
export const state = (): UserStore => ({
  userId: '',
  userToken: ''
})

/** Mutations */
export const mutations: MutationTree<UserStore> = {
  /** ログインユーザー情報のセット */
  setLoginResponse(state: UserStore, response: ILoginResponse) {
    state.userId = response.id
    state.userToken = response.loginToken
  }
}

/** Actions */
export const actions: ActionTree<UserStore, RootStore> = {
  /** ログイン */
  async signin(
    { commit },
    payload: { body: ILoginRequestBody }
  ): Promise<void> {
    try {
      const response = await this.$axios.$put<ILoginResponse>(
        API_ENDPOINT.USER_LOGIN,
        payload.body
      )

      commit('setLoginResponse', response)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

/** Getters */
export const getters: GetterTree<UserStore, UserStore> = {}
