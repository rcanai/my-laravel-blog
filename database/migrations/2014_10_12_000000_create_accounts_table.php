<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use Carbon\Carbon;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('login_id', 191)->comment('ログインID');
            $table->string('name', 100)->comment('氏名')->default('');
            $table->string('phonetic')->comment('フリガナ')->default('');
            $table->string('email', 191)->comment('メールアドレス')->default('');
            $table->string('password', 191)->comment('パスワード');
            $table->string('language', 5)->comment('言語')->default('ja');
            $table->string('timezone', 100)->comment('タイムゾーン')->default('Asia/Tokyo');
            $table->boolean('deleted')->comment('削除')->default(false);

            $table->rememberToken();
            $table->timestamps();
        });

        // admin
        DB::table('accounts')->insert(
            array(
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'login_id' => 'admin',
                'password' => Hash::make('admin'),
                'created_at' => Carbon::now('UTC'),
                'updated_at' => Carbon::now('UTC'),
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
