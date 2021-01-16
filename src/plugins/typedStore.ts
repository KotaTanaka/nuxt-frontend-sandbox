import { Store } from 'vuex';
import { Context, Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import { RootStore } from '@/store';

/**
 * $store に型をあてた $typedStore
 * @param {Context} context
 * @param {Inject} inject
 */
const TypedStorePlugin: Plugin = ({ app }: Context, inject: Inject): void => {
  const store: Store<RootStore> = app.store;
  inject('typedStore', store);
};

export default TypedStorePlugin;
