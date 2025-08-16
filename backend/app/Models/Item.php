<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'unit',
        'image',
        'status',
        'orders',
        'rating',
        'category_id',
        'user_id',
        'province_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
        'orders' => 'integer',
        'rating' => 'decimal:1',
    ];

    /**
     * Scope for active items
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * An item belongs to a user (farmer/seller)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * An item belongs to a category
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * An item belongs to a province
     */
    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * An item can have many order items (through orders)
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'item_id');
    }

    /**
     * Get all orders that contain this item
     */
    public function ordersContaining()
    {
        return $this->hasManyThrough(Order::class, OrderItem::class, 'item_id', 'id', 'id', 'order_id');
    }
}