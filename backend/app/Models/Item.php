<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_kh',
        'category_id',
        'price',
        'stock',
        'unit',
        'unit_kh',
        'image',
        'province',       // ✅ Added
        'description',    // ✅ Added
        'status',
        'orders'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
