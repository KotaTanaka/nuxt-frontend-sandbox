import { Plugin } from '@nuxt/types';

// from app
import * as C from '@/constants';

/**
 * this.$C や context.app.$C を認識させるためのプラグイン
 * @param context
 * @param inject
 */
const ConstantsPlugin: Plugin = (
  _,
  inject: (key: string, value: any) => void,
): void => {
  inject('C', C);
};

export default ConstantsPlugin;
