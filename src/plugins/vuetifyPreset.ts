import { Context, Plugin } from '@nuxt/types';
import { VuetifyPreset } from 'vuetify';

/**
 * this.$vuetifyPreset: VuetifyPreset を認識させるためのプラグイン
 * @param context
 * @param inject
 */
const VuetifyPresetPlugin: Plugin = (
  { app }: Context,
  inject: (key: string, value: any) => void,
): void => {
  const vuetifyPreset: VuetifyPreset = app.vuetify.preset;
  inject('vuetifyPreset', vuetifyPreset);
};

export default VuetifyPresetPlugin;
