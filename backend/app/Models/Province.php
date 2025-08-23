<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    // ✅ FIXED: Use string primary key to match migration
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'province_name', 
        'city', 
        'country', 
        'latitude', 
        'longitude'
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    /**
     * A province has many users
     */
    public function users()
    {
        return $this->hasMany(User::class, 'province_id', 'id');
    }

    /**
     * A province has many items (if items table has province_id)
     */
    public function items()
    {
        return $this->hasMany(Item::class, 'province_id', 'id');
    }

    /**
     * Scope to order by province name
     */
    public function scopeOrderByName($query)
    {
        return $query->orderBy('province_name', 'asc');
    }

    /**
     * Get formatted location string
     */
    public function getLocationAttribute()
    {
        return $this->city ? "{$this->province_name}, {$this->city}" : $this->province_name;
    }
}