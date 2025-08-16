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
        Schema::create('video_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('url'); // Use text for long URLs
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('approved');
            $table->unsignedBigInteger('views')->default(0);
            $table->string('video_id')->nullable(); // YouTube video ID
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['farmer_id', 'is_active']);
            $table->index(['status', 'is_active']);
            $table->index(['views']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_products');
    }
};