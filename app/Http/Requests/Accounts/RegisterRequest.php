<?php

namespace App\Http\Requests\Accounts;

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
            'name' => trans('label.account.name'),
            'phonetic' => trans('label.phonetic'),
            'email' => trans('label.email'),
            'password' => trans('label.password'),
        ];
    }

    public function rules()
    {
        $validations= [
            'login_id' => 'required',
            'name' => 'required|max:50',
            'phonetic' => 'max:50',
            'email' => 'nullable|email',
            'password' => 'nullable|min:6',
        ];
        if (request()->method() === 'POST') {
            // 新規作成の場合
            $validations[] = [
                'password' => 'required|min:6',
            ];
        } else {
            // 更新の場合
            $validations[] = [
                'password' => 'nullable|min:6',
            ];
        }
        return $validations;
    }
}
