<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'address',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }



    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // App\Models\Order.php

   public function items()
{
    return $this->hasMany(OrderItem::class);
}

}
