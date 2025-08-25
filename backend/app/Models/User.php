<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'province_id',
        'role_id',
        'role',
        'image', // Assuming this is a BLOB or base64 string
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
     * Accessor for image URL (data URL if stored as blob/base64)
     */
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            // If image is a base64 string, use it directly
            if (strpos($this->image, 'base64') !== false) {
                return 'data:image/jpeg;base64,' . $this->image; // Adjust MIME type if needed
            }
            // If image is a binary blob, encode it
            return 'data:image/jpeg;base64,' . base64_encode($this->image); // Adjust MIME type if needed
        }
        // Fallback to default image (stored as a file)
        return asset('images/default.jpg');
    }

    // Relationships and boot method remain the same
    public function role() { return $this->belongsTo(Role::class); }
    public function province() { return $this->belongsTo(Province::class, 'province_id', 'id'); }
    public function items() { return $this->hasMany(Item::class); }
    public function orders() { return $this->hasMany(Order::class, 'user_id', 'id'); }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($user) {
            if (!$user->role) $user->role = 'buyer';
            if (!$user->image) $user->image = null; // No default image if stored in DB
        });
    }
}