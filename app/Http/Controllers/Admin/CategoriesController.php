<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Categories\RegisterRequest;

class CategoriesController extends Controller
{
    public function __construct()
    {
        parent::initialize();
    }

    public function index()
    {
        return view('admin.categories.index');
    }

    public function edit($id = 0)
    {
        return view('admin.categories.edit', compact('id'));
    }

    public function fetch($id = 0)
    {
        if (empty($id)) {
            $categories = Category::where('deleted', false);
            $categories->orderBy('updated_at', 'desc');
            return  $categories->get();
        } else {
            $category = Category::find($id);
            return  $category;
        }
    }

    public function register(RegisterRequest $request)
    {
        $category = null;
        if ($request->method() === 'POST') {
            // POSTなら新規作成
            $category = new Category;
        } else {
            // 更新対象を取得
            $category = Category::find($request->id);
        }

        // カラムに値を設定
        $category->name = $request->name ?? '';
        $category->deleted = $request->deleted ?? false;

        // 保存
        $category->save();

        return  $category;
    }

    public function removes()
    {
        $idArray = request('idArray');
        if (!empty($idArray)) {
            $categories = Category::whereIn('id', $idArray);
            $categories->update(['deleted' => true]);
        }

        return $idArray;
    }
}
