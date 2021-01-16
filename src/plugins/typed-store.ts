import { Context, Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import { TypedStore } from '@/@types/vuex';

/**
 * $store に型をあてた $typedStore
 * @param {Context} context
 * @param {Inject} inject
 */
const TypedStorePlugin: Plugin = ({ app }: Context, inject: Inject): void => {
  const store: TypedStore = app.store;
  inject('typedStore', store);
};

export default TypedStorePlugin;
