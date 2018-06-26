<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AccountsController extends Controller
{

    public function __construct()
    {
        parent::shareConstants();
    }

    public function index()
    {
        return view('admin.account');
    }
}
