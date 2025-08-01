<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'status'];
    protected $casts = [
    'name' => 'array',
    'description' => 'array',
];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}

