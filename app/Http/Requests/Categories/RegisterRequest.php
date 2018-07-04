<?php

namespace App\Http\Requests\Categories;

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
            'content_html' => trans('label.name'),
        ];
    }

    public function rules()
    {
        $validations= [
            'name' => 'required',
        ];
        return $validations;
    }
}
