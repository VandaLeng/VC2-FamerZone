<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuyerController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'permission:view products'])->only(['index', 'show']);
        $this->middleware(['auth:sanctum', 'permission:buy products'])->only(['buy']);
    }

    public function index()
    {
        $products = Product::all();
        return response()->json(['message' => 'Products retrieved', 'products' => $products]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json(['message' => 'Product details', 'product' => $product]);
    }

    public function buy(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($id);

        // Basic order creation logic (no stock check)
        $order = [
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'total_price' => $product->price * $request->quantity,
            'status' => 'pending'
        ];

        return response()->json([
            'message' => 'Order placed successfully',
            'product' => $product,
            'order' => $order
        ]);
    }
}