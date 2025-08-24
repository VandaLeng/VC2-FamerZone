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
        'province_id', // <-- use province_id as string to match Province model
        'role_id',
        'role', // Add role field for easier access
        'image',
        'image_url',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $appends = ['image_url'];

    /**
     * A user has one role (via Spatie).
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * A user belongs to a province - FIXED.
     */
    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    /**
     * A user (as a seller) can have many items/products.
     */
    public function items()
    {
        return $this->hasMany(Item::class);
    }

    /**
     * A user (as a buyer) can have many orders.
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id', 'id');
    }

    /**
     * Generate image URL - FIXED
     */
    public function getImageUrlAttribute()
    {
        // If image_url is already set, return it
        if ($this->attributes['image_url']) {
            return $this->attributes['image_url'];
        }
        
        // If image exists and is not default, generate URL
        if ($this->image && $this->image !== 'default.jpg') {
            return url('storage/users/' . $this->image);
        }
        
        return null;
    }

    /**
     * Boot method to set default role
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (!$user->role) {
                $user->role = 'buyer';
            }
            if (!$user->image) {
                $user->image = 'default.jpg';
            }
        });
    }
}