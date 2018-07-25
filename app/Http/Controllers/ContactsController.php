<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Http\Requests\Contacts\ConfirmRequest;
use App\Libraries\Http\ControllerLibrary;

class ContactsController extends Controller
{
    private $library;

    public function __construct(ControllerLibrary $library)
    {
        $this->library = $library;
        $this->library->setCategories();
        parent::shareConstants();
    }

    // 画面
    public function index()
    {
        return view('contacts.index');
    }

    // 画面
    public function confirm(ConfirmRequest $request)
    {
        return view('contacts.confirm');
    }

    // 送信
    public function send()
    {
        // TODO: ここでメール送信などを行う

        // 完了画面にリダイレクト
        return redirect('contacts/success');
    }

    // 完了
    public function success()
    {
        return view('contacts.success');
    }
}
