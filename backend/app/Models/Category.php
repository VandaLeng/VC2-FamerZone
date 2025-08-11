<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Item; // ✅ Import Item model

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'status'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
