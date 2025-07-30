<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('name_kh')->nullable();          // Added name_kh
            $table->text('description')->nullable();         // Changed to text and nullable for flexibility
            $table->string('image')->nullable();             // Made nullable so items can be without image
            $table->decimal('price', 8, 2);
            $table->integer('stock')->default(0);            // Added stock field with default 0
            $table->string('unit')->default('piece');        // Added unit with default
            $table->string('unit_kh')->nullable();           // Added unit_kh nullable
            $table->string('province')->nullable();          // Made nullable if optional
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items'); // Fix table name here (was 'order_item' which is wrong)
    }
};
