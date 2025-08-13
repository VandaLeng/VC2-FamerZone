<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('province_id', 50);
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->integer('stock');
            $table->string('unit')->default('piece');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('active');
            $table->float('rating')->nullable()->default(0);
            $table->integer('orders')->nullable()->default(0);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('items');
    }
}