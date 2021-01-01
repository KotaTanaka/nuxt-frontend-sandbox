import { Store } from 'vuex';
import { Context, Plugin } from '@nuxt/types';
import { RootStore } from '@/store';

/**
 * this.$typedStore: Store<RootStore> を認識させるためのプラグイン
 * @param context
 * @param inject
 */
const TypedStorePlugin: Plugin = (
  { app }: Context,
  inject: (key: string, value: any) => void,
): void => {
  const store: Store<RootStore> = app.store;
  inject('typedStore', store);
};

export default TypedStorePlugin;
