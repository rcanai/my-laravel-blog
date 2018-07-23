<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Libraries\Http\ControllerLibrary;

class HomeController extends Controller
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
        return view('home', compact('posts'));
    }

    public function styleExample()
    {
        return view('style_example');
    }
}
