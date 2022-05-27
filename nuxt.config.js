export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
      title: 'Flutter Documentations',
      htmlAttrs: {
          lang: 'en',
      },
      meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' },
          { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
          { rel: 'stylesheet', href: '/codemirror/lib/codemirror.css' },
          { rel: 'stylesheet', href: '/codemirror/theme/monokai.css' },
        ],
      script: [
          { src: "//cdn.jsdelivr.net/npm/sweetalert2@11" },
          { src: "/js/jquery.min.js" },
          { src: "/js/bootstrap.bundle.min.js" },
          { src: "/js/bootadmin.min.js" },
          { src: '/codemirror/lib/codemirror.js' },
          { src: '/codemirror/mode/clike/clike.js' },
          { src: '/codemirror/mode/dart/dart.js' },
      ],
  },
  loading: { color: 'red' },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      '@/assets/css/bootstrap.min.css',
      '@/assets/css/fontawesome-all.min.css',
      '@/assets/css/bootadmin.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      '@nuxtjs/vuetify',
      '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      'vue-sweetalert2/nuxt',
      '@nuxtjs/toast',

  ],


  router: {
      middleware: ['auth']
  },

  auth: {
      redirect: {
          login: '/login',
          home: '/',
          logout: '/login'
      },
      strategies: {
          local: {
              token: {
                  property: "data.token"
              },
              endpoints: {
                  login: {
                      url: '/login',
                      method: 'post',
                      propertyName: 'data.token',
                  },
                  logout: false,
                  user: {
                      url: '/users',
                      method: 'get',
                      propertyName: 'data',
                  },
              },
              autoFetchUser: true,
          },
      },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
      baseURL: 'https://mydoc-panel.herokuapp.com/api/v1',

  },
  env: {
      API_BASE_URL: 'https://mydoc-panel.herokuapp.com/api/v1',
      BASE_URL: 'https://mydoc-panel.herokuapp.com/api/v1'
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      splitChunks: {
          layouts: true
      },
      extend(config, ctx) {
          // Include the compiler version of Vue so that wp-content works
          config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"
      }
  },
}
