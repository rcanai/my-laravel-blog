<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Libraries\Http\ControllerLibrary;

class ArchivesController extends Controller
{
    protected const PAGE_POST_COUNT = 10;

    private $library;

    public function __construct(ControllerLibrary $library)
    {
        $this->library = $library;
        $this->library->setCategories();
        parent::shareConstants();
    }

    public function index()
    {
        $posts = Post::with(['category', 'images']);
        $posts->where('deleted', false);
        $posts->orderBy('created_at', 'desc');
        $posts = $posts->paginate(self::PAGE_POST_COUNT); // ページネーションを設定
        return view('archives.index', compact('posts'));
    }

    public function show($id = 0)
    {
        $post = Post::with(['category', 'comments'])->find($id);
        if (empty($post)) {
            abort('404');
        }
        return view('archives.show', compact('post'));
    }

    public function search()
    {
        return;
    }
}
