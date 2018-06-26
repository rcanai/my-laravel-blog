<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 共通処理を実行
     */
    public function initialize()
    {
        // ミドルウェアの設定
        $this->middleware('auth');
        $this->middleware('language');
        // 共通定数をviewに渡す
        self::shareConstants();
    }

    /**
     * 共通定数をviewに渡す
     */
    public function shareConstants()
    {
        // 言語
        \View::share('language', app()->getLocale());
    }
}
