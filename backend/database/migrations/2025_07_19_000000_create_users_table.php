<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('province')->nullable(); // using province name, not province_id
            $table->unsignedBigInteger('role_id')->nullable(); // make nullable
            $table->string('image')->nullable(); // user image
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->onDelete('set null'); // set null if role deleted
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
