<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Post;
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
        return view('admin.posts.edit', compact('id'));
    }

    public function fetch($id = 0)
    {
        if (empty($id)) {
            $accounts = Post::where('deleted', false)->get();
            return  $accounts;
        } else {
            $account = Post::find($id);
            return  $account;
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
        $post->title = $request->login_id ?? '';
        $post->name = $request->name ?? '';
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
