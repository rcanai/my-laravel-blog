<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Libraries\Http\ControllerLibrary;

class ArchivesController extends Controller
{
    private $library;

    public function __construct(ControllerLibrary $library)
    {
        $this->library = $library;
        $this->library->setCategories();
        parent::shareConstants();
    }

    public function index()
    {
        $posts = $this->library->getPublishedPosts();
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
        return view('archives.search');
    }
}
