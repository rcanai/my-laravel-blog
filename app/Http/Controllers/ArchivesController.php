<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;

class ArchivesController extends Controller
{
    public function __construct()
    {
        parent::shareConstants();
    }

    public function index()
    {
        $posts = Post::with('category');
        $posts->where('deleted', false);
        $posts->orderBy('created_at', 'desc');
        $posts = $posts->get();
        return view('archives.index', compact('posts'));
    }

    public function show($id = 0)
    {
        $post = Post::with('category')->find($id);
        if (empty($post)) {
            abort('404');
        }
        return view('archives.show', compact('post'));
    }
}
