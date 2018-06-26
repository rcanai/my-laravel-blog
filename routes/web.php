<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

// Auth::routes();
$this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
$this->post('login', 'Auth\LoginController@login');
$this->get('logout', 'Auth\LoginController@logout')->name('logout');
// $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
// $this->post('register', 'Auth\RegisterController@register');
// $this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
// $this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
// $this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
// $this->post('password/reset', 'Auth\ResetPasswordController@reset');

// Home
Route::get('/', 'HomeController@index')->name('home');

// Example
Route::get('style-example', 'HomeController@styleExample')->name('styleExample');

// Admin
Route::get('admin', 'Admin\AdminController@index');

// Accounts
Route::get('accounts', 'Admin\AccountsController@index');


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

Route::prefix('_api')->group(function () {
    // Accounts
    Route::get('accounts', 'Admin\AccountsController@fetch');
    Route::get('accounts/{id}', 'Admin\AccountsController@fetch');
});
