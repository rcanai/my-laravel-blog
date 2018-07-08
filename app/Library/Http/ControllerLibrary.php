<?php
namespace App\Libraries\Http;

use App\Models\Category;

class ControllerLibrary
{
    public function setCategories()
    {
        $categories = Category::where('deleted', false)->get();
        \View::share('categories', $categories);
    }
}
