<?php

namespace App\Http\Requests\Posts;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function attributes()
    {
        return [
            'login_id' => trans('label.login_id'),
            'content_html' => trans('label.post.content'),
        ];
    }

    public function rules()
    {
        $validations= [
            'title' => 'required',
            'content_html' => 'required',
        ];
        return $validations;
    }
}
