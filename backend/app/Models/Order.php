<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['buyer_id', 'quantity', 'total_price', 'status'];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
