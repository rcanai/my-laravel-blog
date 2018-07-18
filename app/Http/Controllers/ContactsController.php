<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class ContactsController extends Controller
{
    public function __construct()
    {
        parent::shareConstants();
    }

    // 画面
    public function index()
    {
        return;
    }
}
