<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Category extends Model
{
    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function post()
    {
        $this->hasMany(Post::class, 'post_id');
    }
}
