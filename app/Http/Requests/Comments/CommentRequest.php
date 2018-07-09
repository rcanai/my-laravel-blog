<?php

namespace App\Http\Requests\Comments;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function attributes()
    {
        return [
            'post_id' => trans('label.comment.post_id'),
            'content' => trans('label.content'),
            'author' => trans('label.author'),
        ];
    }

    public function rules()
    {
        $validations= [
            'post_id' => 'required',
            'content' => 'required',
            'author' => 'required',
        ];
        return $validations;
    }
}
