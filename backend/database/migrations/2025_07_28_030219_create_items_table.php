<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // 👈 User relationship
            $table->string('name');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->decimal('price', 8, 2);
            $table->integer('stock');
            $table->string('unit');
            $table->string('image')->nullable();
            $table->string('province');
            $table->text('description')->nullable();
            $table->string('status')->default('active');
            $table->integer('orders')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items'); // Fix table name here (was 'order_item' which is wrong)
    }
};
