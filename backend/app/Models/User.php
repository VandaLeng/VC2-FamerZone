<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'province', // match migration
        'role_id',
        'image',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // ✅ Automatically include image_url in JSON
    protected $appends = ['image_url'];

    // ✅ Return full image URL
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return url('storage/users/' . $this->image);
        }
        return asset('images/default.png');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function item()
    {
        return $this->hasMany(Item::class);
    }
}
