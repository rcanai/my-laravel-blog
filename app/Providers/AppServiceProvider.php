<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // HTTP / HTTPS (SSL)
        \URL::forceScheme('http');

        // タイムスタンプを付加してキャッシュを抑制
        \Blade::directive('assetTimestamp', function ($filePath) {
            return asset($filePath) . '?ts=' . time();
        });

         // SQLのログを残す
         \DB::listen(function ($query) {
            $sql = $query->sql;
            for ($i = 0; $i < count($query->bindings); $i++) {
                $sql = preg_replace("/\?/", $query->bindings[$i], $sql, 1);
            }
            // 日付ごとに出す
            \Log::channel('daily')->info($sql);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
