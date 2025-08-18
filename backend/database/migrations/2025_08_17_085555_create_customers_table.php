<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('customers', function (Blueprint $table) {
        $table->id();
        $table->string('customer_id')->unique();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('phone');
        $table->string('location')->nullable();
        $table->date('join_date')->nullable();
        $table->integer('total_orders')->default(0);
        $table->decimal('total_spent', 10, 2)->default(0);
        $table->date('last_order_date')->nullable();
        $table->enum('status', ['active', 'inactive', 'blocked'])->default('active');
        $table->string('avatar')->nullable();
        $table->decimal('rating', 2, 1)->default(0);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
