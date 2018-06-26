<?php
namespace App\Http\Requests;

use \Illuminate\Validation\Validator;
use Carbon\Carbon;

class CustomValidator extends Validator
{
    /**
     * 郵便番号
     */
    public function validateJpZipCode($attribute, $value, $parameters)
    {
        return preg_match("/^[0-9\-]{7,8}+$/i", $value);
    }

    public function replaceJpZipCode($attribute, $value, $parameters)
    {
        $val = $this->getValue($parameters[0]);
        $attr = $this->getDisplayableAttribute($parameters[0]);
        return str_replace([':other', ':value'], [$attr, $val], $message);
    }
}
