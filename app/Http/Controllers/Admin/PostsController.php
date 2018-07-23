<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\Category;
use App\Http\Requests\Posts\RegisterRequest;
use App\Libraries\Http\ControllerLibrary;
use Carbon\Carbon;

class PostsController extends Controller
{
    private $library;

    public function __construct(ControllerLibrary $library)
    {
        $this->library = $library;
        parent::initialize();
    }

    public function index()
    {
        return view('admin.posts.index');
    }

    public function edit($id = 0)
    {
        $categories = Category::where('deleted', false)->get();

        return view('admin.posts.edit', compact('id', 'categories'));
    }

    public function fetch($id = 0)
    {
        if (empty($id)) {
            $posts = Post::select('posts.*', 'categories.name as category_name');
            $posts->leftJoin('categories', 'posts.category_id', '=', 'categories.id');
            $posts->where('posts.deleted', false);
            $posts->orderBy('posts.published_at', 'desc');
            return $posts->get();
        } else {
            $post = Post::find($id);
            if (empty($post)) {
                abort('404');
            }
            return $post;
        }
    }

    public function register(RegisterRequest $request)
    {
        $post = null;
        if ($request->method() === 'POST') {
            // POSTなら新規作成
            $post = new Post;
        } else {
            // 更新対象を取得
            $post = Post::find($request->id);
        }

        // カラムに値を設定
        $post->title = $request->title ?? '';
        $post->content_html = $request->content_html ?? '';
        $post->content = strip_tags($post->content_html);
        $post->category_id = $request->category_id ?? 0;
        if (isset($request->published_at)) {
            $post->published_at = Carbon::parse($request->published_at);
        }
        $post->deleted = $request->deleted ?? false;

        // 保存
        $post->save();

        // 既存の画像レコードをすべて消す
        PostImage::where('post_id', $post->id)->delete();

        // 画像のURLを保存
        $urls = $this->library->getImgUrls($post->content_html);
        foreach ($urls as $url) {
            $postImage = new PostImage();
            $postImage->post_id = $post->id;
            $postImage->url = $url;
            $postImage->save();
        }

        // 登録した記事を返す
        return $this->fetch($post->id);
    }

    public function removes()
    {
        $idArray = request('idArray');
        if (!empty($idArray)) {
            $posts = Post::whereIn('id', $idArray);
            $posts->update(['deleted' => true]);
        }

        return $idArray;
    }
}
