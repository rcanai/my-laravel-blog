<?php

namespace App\Http\Requests\Contacts;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmRequest extends FormRequest
{
    protected $redirect = 'contacts';

    public function authorize()
    {
        return true;
    }

    public function attributes()
    {
        return [
            'name' => trans('label.name'),
            'email' => trans('label.email'),
            'content' => trans('label.content'),
        ];
    }

    public function rules()
    {
        $validations= [
            'name' => 'required|min:3|max:100',
            'email' => 'required|email',
            'content' => 'required',
        ];
        return $validations;
    }
}
