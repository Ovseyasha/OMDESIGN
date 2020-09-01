
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap', rel: 'stylesheet' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/22d4ab7a71.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style.less',
    './node_modules/animate.css/animate.min.css',
    'normalize.css'
  ],
  loading: { color: '#a0c601', height: '5px', failedColor: '#F57F6C' },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vuelidate',
    '@/plugins/swiper'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDW9amaT-kZaTTuSYzbwZs7ewNF0dgXJBs',
          authDomain: 'omdesign-om.firebaseapp.com',
          databaseURL: 'https://omdesign-om.firebaseio.com',
          projectId: 'omdesign-om',
          storageBucket: 'omdesign-om.appspot.com',
          messagingSenderId: '731537717616',
          appId: '1:731537717616:web:a8aa520a6f8f4d6717f7b5',
          measurementId: 'G-RD3BNHGCVQ'
        },
        services: {
          auth: true,
          storage: true,
          realtimeDb: true,
          analytics: true
        }
      }]
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
