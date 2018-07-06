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
        return view('archives.index');
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
