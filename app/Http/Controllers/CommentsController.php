<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Http\Requests\Comments\CommentRequest;

class CommentsController extends Controller
{
    public function __construct()
    {
        parent::shareConstants();
    }

    // 投稿
    public function comment(CommentRequest $request)
    {
        $comment = new Comment();
        $comment->post_id = $request->post_id;
        $comment->author = $request->author;
        $comment->content = $request->content;
        $comment->save();

        return redirect('/')->with('status', 'comment added!');
    }
}
