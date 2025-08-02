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
<<<<<<< HEAD
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
=======
>>>>>>> 669d743ece670f79fd732c3ac4b4209d671a7f79
            $table->decimal('price', 8, 2);
            $table->integer('stock');
            $table->string('unit');
            $table->string('image')->nullable();
            $table->string('province');
            $table->text('description')->nullable();
            $table->string('status')->default('active');
            $table->integer('orders')->default(0);
            $table->timestamps();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items'); 
    }
};
