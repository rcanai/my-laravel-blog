let mix = require('laravel-mix');

// Path
mix.setPublicPath('public');

// JavaScript
mix
  .js('resources/assets/js/home.js', 'js')
  /* Common & Vendors */
  .js('resources/assets/js/app.js', 'js')
  .extract(
    [
      'babel-polyfill',
      'jquery/dist/jquery.slim.min',
      'vue',
      'i18next',
      'axios',
      'moment',
      'moment-timezone'
    ],
    'js/vendors'
  )
;

// Scss
mix
  /* Common & Vendors */
  .sass('resources/assets/sass/app.scss', 'css')
  /* Pages */
  .sass('resources/assets/sass/home.scss', 'css')
  .sass('resources/assets/sass/auth.scss', 'css')
;

// jqueryを設定
mix.autoload({
  'jquery/dist/jquery.slim.min': ['$', 'window.jQuery', 'window.$']
});

// Disable Notification
mix.disableNotifications();


// 開発環境のみの設定
if (!mix.inProduction()) {
  mix.webpackConfig({
    devtool: 'inline-source-map',
    watchOptions: {
      poll: 300 /* Vagrant error avoidance */
    },
    module: {
      rules: [{
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            failOnError: true
          }
        }],
      },
    ],
  },
  })
  .sourceMaps()
}
