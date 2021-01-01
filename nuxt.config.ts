import { NuxtConfig } from '@nuxt/types';

/** 環境変数 */
const { NUXT_HOST = '0.0.0.0', NUXT_PORT = '5050' } = process.env;

/** Nuxtの設定 */
const config: NuxtConfig = {
  /* 開発サーバー */
  server: {
    host: NUXT_HOST,
    port: NUXT_PORT,
  },
  /* ビルドモジュール */
  buildModules: ['@nuxt/typescript-build'],
  /* 起動モード */
  ssr: true,
  /* ソースディレクトリ */
  srcDir: 'src/',
  /* ページヘッダ */
  head: {
    title: '商品管理コンソール',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '商品管理コンソール',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /* プログレスバー */
  loading: { color: '#fff' },
  /* グローバルCSS */
  css: [],
  /* プラグイン */
  plugins: ['@/plugins/constants', '@/plugins/typedStore'],
  /* Nuxtモジュール */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    '@nuxtjs/font-awesome',
    'nuxt-mq',
  ],
  /* Axios */
  axios: {
    baseURL: 'http://localhost:7070',
  },
  /* Vuetify */
  vuetify: {
    customVariables: ['@/assets/styles/_variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#8A0868',
          secondary: '#B40486',
          tertiary: '#DF01A5',
          error: '#b71c1c',
        },
      },
    },
  },
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: {
      sp: 600,
      pc: Infinity,
    },
  },
  /* Build configuration */
  build: {
    /* Webpack の拡張 */
    extend() {},
  },
};

export default config;
