<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Accounts\RegisterRequest;

class AccountsController extends Controller
{

    public function __construct()
    {
        parent::shareConstants();
    }

    public function index()
    {
        return view('admin.accounts.index');
    }

    public function edit($id = 0)
    {
        return view('admin.accounts.edit', compact('id'));
    }

    public function fetch($id = 0)
    {
        if (empty($id)) {
            $accounts = Account::where('deleted', false)->get();
            return  $accounts;
        } else {
            $account = Account::find($id);
            return  $account;
        }
    }

    public function register(RegisterRequest $request)
    {
        $account = null;
        if ($request->method() === 'POST') {
            // POSTなら新規作成
            $account = new Account;
        } else {
            // 更新対象を取得
            $account = Account::find($request->id);
        }

        // パスワードが存在すれば更新する
        $password = $request->password ?? '';
        if (isset($password) && !empty($password)) {
            $account->password = Hash::make($password);
        }

        // カラムに値を設定
        $account->login_id = $request->login_id ?? '';
        $account->name = $request->name ?? '';
        $account->phonetic = $request->phonetic ?? '';
        $account->email = $request->email ?? '';

        $account->deleted = $request->deleted ?? false;

        // 保存
        $account->save();

        return  $account;
    }

    public function removes()
    {
        $idArray = request('idArray');
        if (!empty($idArray)) {
            $accounts = Account::whereIn('id', $idArray);
            $accounts->update(['deleted' => true]);
        }

        return $idArray;
    }
}
