import { Store } from 'vuex';

// from app
import { RootStore } from '@/store';
import * as C from '@/constants';

/** Vueインスタンスのthisで参照するカスタムプラグインの型定義 */
declare module 'vue/types/vue' {
  interface Vue {
    /** Store<RootStore> をあてた $store */
    readonly $typedStore: Store<RootStore>;
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** Vuexストアのthisで参照するカスタムプラグインの型定義 */
declare module 'vuex/types/index' {
  interface Store<S> {
    /** 定数 */
    readonly $C: typeof C;
  }
}

/** コンテキスト(context.app)で参照するカスタムプラグインの型定義 */
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    /** 定数 */
    readonly $C: typeof C;
  }
}
