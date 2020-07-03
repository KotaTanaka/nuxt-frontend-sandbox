import { Store } from 'vuex';

// from app
import { RootStore } from '@/store';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $typedStore: Store<RootStore>;
  }
}
