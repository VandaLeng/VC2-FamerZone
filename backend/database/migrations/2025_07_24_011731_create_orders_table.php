<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique(); // Add order ID like ORD-001
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Added missing product_id
            $table->string('product_name'); // Store product name for history
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2); // Price per unit
            $table->decimal('total_price', 10, 2);
            $table->string('unit')->default('kg'); // kg, pieces, bunches, etc.
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'delivered'])->default('pending');
            $table->text('delivery_address')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};