let mix = require('laravel-mix');

// Path
mix.setPublicPath('public');

// JavaScript
mix
  .js('resources/assets/js/home.js', 'js')
  .js('resources/assets/js/archives/show.js', 'js/archives')
  // admin
  .js('resources/assets/js/admin/index.js', 'js/admin')
  .js('resources/assets/js/admin/accounts/index.js', 'js/admin/accounts')
  .js('resources/assets/js/admin/accounts/edit.js', 'js/admin/accounts')
  .js('resources/assets/js/admin/posts/index.js', 'js/admin/posts')
  .js('resources/assets/js/admin/posts/edit.js', 'js/admin/posts')
  .js('resources/assets/js/admin/categories/index.js', 'js/admin/categories')
  .js('resources/assets/js/admin/categories/edit.js', 'js/admin/categories')
  /* Common & Vendors */
  .js('resources/assets/js/app.js', 'js')
  .js('resources/assets/js/admin.js', 'js')
  .extract(
    [
      'jquery/dist/jquery.slim.min',
      'babel-polyfill',
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
  .sass('resources/assets/sass/admin.scss', 'css')
  /* Pages */
  .sass('resources/assets/sass/home.scss', 'css')
  .sass('resources/assets/sass/auth.scss', 'css')
;

// OSのコンパイル完了通知を抑制
mix.disableNotifications();

// パス管理を簡単に
mix.webpackConfig({
  resolve: {
    alias: {
      '@js': __dirname + '/resources/assets/js',
      '@scss': __dirname + '/resources/assets/scss',
    }
  },
});

// 開発環境のみの設定
if (!mix.inProduction()) {
  mix.webpackConfig({
    devtool: 'inline-source-map',
    // watch-pollで同じことを再現できるためコメントアウト
    // watchOptions: {
    //   poll: true
    // },
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
