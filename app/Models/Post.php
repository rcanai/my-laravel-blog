<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
use App\Models\Category;

class Post extends Model
{
    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function comments()
    {
        return $this
            ->hasMany(Comment::class, 'post_id', 'id')
            ->select('id', 'content');
    }

    public function category()
    {
        return $this
            ->belongsTo(Category::class, 'category_id', 'id')
            ->select('id', 'name', 'deleted')
            ->withDefault();
    }
}
