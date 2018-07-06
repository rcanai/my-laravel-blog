<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Comment extends Model
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
        return $this->belongsTo(Post::class, 'post_id', 'id')->withDefault([
            'id' => 0
        ]);
    }
}
