/* eslint-disable no-unused-vars */

import { TypedStore } from '@/@types/vuex';
import * as C from '@/constants';

/** Vueインスタンスのコンテキスト(context.root)から使うカスタムプラグインの型定義 */
declare module 'vue/types/vue' {
  interface Vue {
    /** タイプセーフな $store */
    readonly $typedStore: TypedStore;
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** Vuexのthisから使うカスタムプラグインの型定義 */
declare module 'vuex/types/index' {
  interface Store<S> {
    /** タイプセーフな $store */
    readonly $typedStore: TypedStore;
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** コンテキスト(context.app)から使うカスタムプラグインの型定義 */
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    /** タイプセーフな $store */
    readonly $typedStore: TypedStore;
    /** 定数 */
    readonly $C: typeof C;
  }
}
