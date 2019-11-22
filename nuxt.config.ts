import { Configuration } from '@nuxt/types'

/** 環境変数 */
const { NUXT_HOST = '0.0.0.0', NUXT_PORT = '5050' } = process.env

/** Nuxtの設定 */
const config: Configuration = {
  /* 開発サーバー */
  server: {
    host: NUXT_HOST,
    port: NUXT_PORT
  },
  /* ビルドモジュール */
  buildModules: ['@nuxt/typescript-build'],
  /* 起動モード */
  mode: 'spa',
  /* ソースディレクトリ */
  srcDir: 'src/',
  /* ページヘッダ */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /* プログレスバー */
  loading: { color: '#fff' },
  /* グローバルCSS */
  css: [],
  /* プラグイン */
  plugins: [],
  /* Nuxtモジュール */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
    '@nuxtjs/font-awesome',
    'bootstrap-vue/nuxt'
  ],
  /* Axios */
  axios: {
    baseURL: 'http://localhost:7070'
  },
  /* Vuetify */
  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  /* Build configuration */
  build: {
    /* Webpack の拡張 */
    extend() {}
  }
}

export default config
