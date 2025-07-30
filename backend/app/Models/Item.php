<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

// In app/Models/Item.php
protected $fillable = [
    'name',
    'name_kh',
    'category_id',
    'price',
    'stock',
    'unit',
    'unit_kh',
    'user_id',
    'image',
];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
