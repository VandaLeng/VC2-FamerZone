<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data' => $orders,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'buyer_id' => 'required|exists:users,id',
            'address' => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'status' => 'in:pending,confirmed,cancelled,delivered',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['order' => $order], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validated = $request->validate([
            'buyer_id' => 'required|exists:users,id',
            'address' => 'required|string|max:255',
            'total_price' => 'required|numeric|min:0',
            'status' => 'in:pending,confirmed,cancelled,delivered',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
