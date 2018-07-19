<?php
namespace App\Libraries\Http;

use App\Models\Category;

class ControllerLibrary
{
    /**
     * カテゴリーを設定
     */
    public function setCategories()
    {
        $categories = Category::where('deleted', false)->get();
        \View::share('categories', $categories);
    }

    /**
     * HTMLの文字列からIMGタグ内のSRCの値を取得
     * @param string $html
     * @return array
     */
    public function getImgUrls($html)
    {
        $urls = [];
        preg_match_all('/<img[^>]+>/i', $html, $imgs);
        for ($i = 0; $i < count($imgs[0]); $i++) {
            preg_match('/src="([^"]+)/i', $imgs[0][$i], $srcs);
            $urls[] = str_ireplace('src="', '', $srcs[0]);
        }
        return $urls;
    }
}
