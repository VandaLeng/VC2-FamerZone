<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    /**
     * Display a listing of order items.
     */
    public function index()
    {
        $orderItems = OrderItem::with(['order', 'item'])->paginate(10);
        return response()->json($orderItems);
    }

    /**
     * Store a newly created order item.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified order item.
     */
    public function show(OrderItem $orderItem)
    {
    }

    /**
     * Update the specified order item.
     */
    public function update(Request $request, OrderItem $orderItem)
    {
    }

    /**
     * Remove the specified order item.
     */
    public function destroy(OrderItem $orderItem)
    {
    }
}
