<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTableAddMissingColumns extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add image column if it doesn't exist
            if (!Schema::hasColumn('users', 'image')) {
                $table->string('image')->nullable()->after('role_id')->default('default.jpg');
            }
            
            // Add image_url column for full URL path
            if (!Schema::hasColumn('users', 'image_url')) {
                $table->text('image_url')->nullable()->after('image');
            }
            
            // Modify province_id to be string if it's not already (to match Province model)
            if (Schema::hasColumn('users', 'province_id')) {
                $table->string('province_id', 50)->nullable()->change();
            } else {
                $table->string('province_id', 50)->nullable()->after('phone');
            }
            
            // Add role column as string for backward compatibility
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('buyer')->after('role_id');
            }

            // Add foreign key constraint for province_id
            if (!collect(Schema::getConnection()->getDoctrineSchemaManager()->listTableForeignKeys('users'))->contains(function ($fk) {
                return in_array('province_id', $fk->getColumns());
            })) {
                $table->foreign('province_id')->references('id')->on('provinces')->onDelete('set null');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop foreign key first
            $table->dropForeign(['province_id']);
            
            if (Schema::hasColumn('users', 'image')) {
                $table->dropColumn('image');
            }
            if (Schema::hasColumn('users', 'image_url')) {
                $table->dropColumn('image_url');
            }
            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }
        });
    }
}