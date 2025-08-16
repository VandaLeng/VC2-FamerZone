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
            $table->string('url', 1000); // Increased length for long URLs
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable(); // Custom thumbnail path
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('approved'); // Auto-approve for now
            $table->unsignedBigInteger('views')->default(0); // Changed to unsignedBigInteger for large view counts
            $table->string('video_id')->nullable(); // Store YouTube video ID
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['farmer_id', 'is_active']);
            $table->index(['status', 'created_at']);
            $table->index(['is_active', 'status', 'created_at']);
            $table->index(['views']); // Index for popular video queries
            $table->index(['farmer_id', 'views']); // Composite index for farmer's popular videos
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