import { Plugin } from '@nuxt/types';
import { Inject } from '@nuxt/types/app';
import * as C from '@/constants';

/**
 * 定数参照 $C
 * @param {Context} context
 * @param {Inject} inject
 */
const ConstantsPlugin: Plugin = (_, inject: Inject): void => {
  inject('C', C);
};

export default ConstantsPlugin;
