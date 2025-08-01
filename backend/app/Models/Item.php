<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
        'price',
        'stock',
        'unit',
        'image',
        'province',
        'description',
        'status',
        'orders',
        'user_id',
    ];

    protected $appends = ['image_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor to get full image URL
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/items/' . $this->image) : null;
    }
}
