/* eslint-disable no-unused-vars */

import { Store } from 'vuex';
import { RootStore } from '@/store';
import * as C from '@/constants';

/** Vueインスタンスのコンテキスト(context.root)から使うカスタムプラグインの型定義 */
declare module 'vue/types/vue' {
  interface Vue {
    /** Store<RootStore> をあてた $store */
    readonly $typedStore: Store<RootStore>;
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** Vuexのthisから使うカスタムプラグインの型定義 */
declare module 'vuex/types/index' {
  interface Store<S> {
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** コンテキスト(context.app)から使うカスタムプラグインの型定義 */
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    /** 定数 */
    readonly $C: typeof C;
  }
}
