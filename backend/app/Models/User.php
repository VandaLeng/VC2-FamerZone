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

<<<<<<< HEAD
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

=======
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * A user has one role.
     */
>>>>>>> main
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * A user belongs to a province.
     */
    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id');
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
}