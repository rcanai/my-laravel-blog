<?php
namespace App\Libraries\Http;

use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;

class ControllerLibrary
{
    protected const PAGE_POST_COUNT = 10;

    /**
     * カテゴリーを設定
     */
    public function setCategories()
    {
        $categories = Category::where('deleted', false)->orderBy('name')->get();
        \View::share('categories', $categories);
    }

    /**
     * 公開されている記事を取得
     */
    public function getPublishedPosts()
    {
        // 検索値
        $request = request()->all();
        // クエリビルダー
        $posts = Post::with([
            'category' => (function ($query) {
                $query->orderBy('name');
            }),
            'images' => (function ($query) {
                $query->orderBy('id');
                $query->limit(3);
            })
        ]);
        $posts->where('posts.deleted', false);
        $posts->where('posts.published_at', '<=', Carbon::now());
        $posts->orderBy('posts.published_at', 'desc');
        $posts->orderBy('posts.updated_at', 'desc');

        // カテゴリーで絞る
        if (isset($request['category'])) {
            $posts->where('posts.category_id', $request['category']);
        }

        // 文字列検索
        if (isset($request['s'])) {
            $s = $request['s'];
            $posts->where(function ($query) use ($s) {
                $query->where('posts.title', 'like', "%{$s}%");
                $query->orWhere('posts.content', 'like', "%{$s}%");
            });
        }

        // ページネーションして返す
        $posts = $posts->paginate(self::PAGE_POST_COUNT);
        return $posts;
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
