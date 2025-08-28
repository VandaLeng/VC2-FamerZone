<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Get the total price of all orders.
     */
    public function getTotalPrice()
    {
        $total = Order::sum('total_price');
        return response()->json(['total_price' => $total]);
    }
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['user', 'items'])->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'total_price' => 'required|numeric|min:0',
            'address' => 'nullable|string|max:255',
            'status' => 'nullable|in:pending,confirmed,delivered,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Find user by name and email
        $user = User::where('name', $request->name)
            ->where('email', $request->email)
            ->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found with the provided name and email'
            ], 404);
        }

        // Ensure the found user matches the authenticated user
        if ($user->id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized: Provided name and email do not match authenticated user'
            ], 403);
        }

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $request->total_price,
            'address' => $request->address,
            'status' => $request->status ?? 'pending',
        ]);


        return response()->json([
            'status' => 'success',
            'data' => $order->load(['user', 'items']),
            'message' => 'Order created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['user', 'items'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $order
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'total_price' => 'numeric|min:0',
            'address' => 'nullable|string|max:255',
            'status' => 'in:pending,confirmed,delivered,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // If name and email are provided, find the user
        if ($request->has('name') && $request->has('email')) {
            $user = User::where('name', $request->name)
                ->where('email', $request->email)
                ->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found with the provided name and email'
                ], 404);
            }

            // Ensure the found user matches the authenticated user
            if ($user->id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized: Provided name and email do not match authenticated user'
                ], 403);
            }

            $order->user_id = $user->id;
        }

        $order->update($request->only(['total_price', 'address', 'status']));

        return response()->json([
            'status' => 'success',
            'data' => $order->load(['user', 'items']),
            'message' => 'Order updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);

        $order->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Order deleted successfully'
        ], 200);
    }
}
