<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProvinceIdToUsersTable extends Migration
{
    public function up()
{
    if (!Schema::hasColumn('users', 'province_id')) {
        Schema::table('users', function (Blueprint $table) {
            $table->string('province_id', 50)->nullable()->after('phone');
        });
    }
}


    public function down()
{
    if (Schema::hasColumn('users', 'province_id')) {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('province_id');
        });
    }
}

}
