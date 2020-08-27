// const webpack = require('webpack')
require('dotenv').config()
const {
  BASE_URL,
  // CDN_URL,
  projectNameJa,
  projectNameEn,

  projectDescriptionJa,
  projectDescriptionEn,
  GOOGLE_ANALYTICS_ID,
  SHORT_NAME,
} = process.env

/* nuxt.config.js */
// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/genji/',
        },
      }
    : {}

// path
const baseUrl = process.env.BASE_URL
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

// meta
const lang = 'ja'
const siteName = process.env.projectNameJa
const siteDesc = process.env.projectDescriptionJa
const siteKeywords = process.env.projectKeywords

// images
const iconImages = basePath + 'img/icons/'
const ogpImages = basePath + 'img/ogp/' // cdnPath + 'img/ogp/'

// pwa
const shortName = process.env.SHORT_NAME
const manifestIcon = 'img/icons/icon-512.png'
// const splashscreens = cdnPath + 'img/splashscreens/'

module.exports = {
  server: {
    port: 8008, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost
  },
  ...routerBase,
  env: {
    BASE_URL,
    // CDN_URL,
    projectNameJa,
    projectNameEn,
    projectDescriptionJa,
    projectDescriptionEn,
    GOOGLE_ANALYTICS_ID,
    SHORT_NAME,
  },
  // serverMiddleware: ['~~/api/'],
  workbox: {
    runtimeCaching: [
      {
        urlPattern: baseDir + '.*',
        handler: 'staleWhileRevalidate',
        strategyOptions: {
          cacheName: 'my-cache',
          cacheExpiration: {
            maxAgeSeconds: 24 * 60 * 60 * 30,
          },
        },
      },
    ],
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
  // mode: 'universal',
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang,
    },
    titleTemplate: `%s - ${siteName}`,
    // title: 'Cultural Japan',
    meta: [
      { chatset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no',
      },
      // SEO関連
      { hid: 'description', name: 'description', content: siteDesc },
      { hid: 'keywords', name: 'keywords', content: siteKeywords },
      // ogp関連
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteName,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.png`,
      },
      /*
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'ja_JP'
      }
      */
      { name: 'twitter:card', content: 'summary_large_image' },
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
    ],
    link: [
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: iconImages + 'favicon-16.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: iconImages + 'favicon-32.png',
      },
      {
        rel: 'icon',
        sizes: '48x48',
        type: 'image/png',
        href: iconImages + 'favicon-48.png',
      },
      {
        rel: 'icon',
        sizes: '72x72',
        type: 'image/png',
        href: iconImages + 'favicon-72.png',
      },
      // apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: iconImages + 'apple-touch-icon.png',
      },
    ],
  },
  manifest: {
    lang,
    name: siteName,
    short_name: shortName,
    description: siteDesc,
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
  },
  icon: {
    iconFileName: manifestIcon,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#E64A19', height: '5px' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-analytics',
      {
        id: GOOGLE_ANALYTICS_ID,
      },
    ],
    'nuxt-leaflet',
    // ['@nuxtjs/moment', ['ja', 'en']],
    '@nuxtjs/moment',
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en_US', file: 'en.json' },
      { code: 'ja', iso: 'ja_JP', file: 'ja.json' },
    ],
    defaultLocale: 'ja',
    vueI18nLoader: true,
    lazy: true,
    langDir: 'lang/',
    // strategy: 'no_prefix'
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: baseUrl,
    // generate: true,
    exclude: ['/admin', '/test*', '/en/test*'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line
    extend(config, ctx) {}
  },
}
