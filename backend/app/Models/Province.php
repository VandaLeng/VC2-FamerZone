<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['province_name', 'latitude', 'longitude', 'city', 'country'];

    public function users()
    {
        return $this->hasMany(User::class, 'province_id');
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
