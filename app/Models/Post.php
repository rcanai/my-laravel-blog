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
        $this->hasMany(Comment::class, 'post_id');
    }

    public function categories()
    {
        $this->belongsTo(Category::class, 'category_id');
    }
}
