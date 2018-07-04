<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Http\Requests\Posts\RegisterRequest;

class PostsController extends Controller
{
    public function __construct()
    {
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
            $posts = Post::with('category')->where('deleted', false);
            $posts->orderBy('updated_at', 'desc');
            return  $posts->get();
        } else {
            $post = Post::find($id);
            return  $post;
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
        $post->deleted = $request->deleted ?? false;

        // 保存
        $post->save();

        return  $post;
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
