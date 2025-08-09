<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropProvinceColumnFromItemsTable extends Migration
{
    public function up()
    {
        if (Schema::hasColumn('items', 'province')) {
            Schema::table('items', function (Blueprint $table) {
                $table->dropColumn('province');
            });
        }
    }

    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->string('province')->nullable()->after('description');
        });
    }
}
