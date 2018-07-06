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

// Archives
Route::get('archives', 'ArchivesController@index');
Route::get('archives/{id}', 'ArchivesController@show');


// Admin
Route::get('admin', 'Admin\AdminController@index');

// Accounts
Route::get('accounts', 'Admin\AccountsController@index');
Route::get('accounts/edit', 'Admin\AccountsController@edit');
Route::get('accounts/edit/{id}', 'Admin\AccountsController@edit');

// Posts
Route::get('posts', 'Admin\PostsController@index');
Route::get('posts/edit', 'Admin\PostsController@edit');
Route::get('posts/edit/{id}', 'Admin\PostsController@edit');

// Categories
Route::get('categories', 'Admin\CategoriesController@index');
Route::get('categories/edit', 'Admin\CategoriesController@edit');
Route::get('categories/edit/{id}', 'Admin\CategoriesController@edit');

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
    Route::post('accounts', 'Admin\AccountsController@register');
    Route::put('accounts', 'Admin\AccountsController@register');
    Route::delete('accounts', 'Admin\AccountsController@removes');

    // Posts
    Route::get('posts', 'Admin\PostsController@fetch');
    Route::get('posts/{id}', 'Admin\PostsController@fetch');
    Route::post('posts', 'Admin\PostsController@register');
    Route::put('posts', 'Admin\PostsController@register');
    Route::delete('posts', 'Admin\PostsController@removes');

    // Categories
    Route::get('categories', 'Admin\CategoriesController@fetch');
    Route::get('categories/{id}', 'Admin\CategoriesController@fetch');
    Route::post('categories', 'Admin\CategoriesController@register');
    Route::put('categories', 'Admin\CategoriesController@register');
    Route::delete('categories', 'Admin\CategoriesController@removes');
});
