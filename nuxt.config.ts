import { Configuration } from '@nuxt/types'

const config: Configuration = {
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
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@nuxtjs/pwa'],
  /* Axios */
  axios: {
    baseURL: 'http://localhost:7070'
  },
  /* Build configuration */
  build: {
    /* Webpack の拡張 */
    extend() {}
  }
}

export default config
