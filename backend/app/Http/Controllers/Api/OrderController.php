<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log; // ✅ Added for logging
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\User;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized',
                ], 401);
            }

            $orders = Order::where('user_id', $user->id)
                ->with([
                    'items' => function($query) {
                        $query->with([
                            'item' => function($itemQuery) {
                                $itemQuery->with(['user', 'category', 'province']);
                            }
                        ]);
                    }
                ])
                ->latest()
                ->get();

            $transformedOrders = $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_price' => (float) $order->total_price,
                    'status' => $order->status,
                    'address' => $order->address,
                    'created_at' => $order->created_at->toISOString(),
                    'updated_at' => $order->updated_at->toISOString(),
                    'items' => $order->items->map(function ($orderItem) {
                        $item = $orderItem->item;
                        return [
                            'id' => $orderItem->id,
                            'quantity' => $orderItem->quantity,
                            'price' => (float) $orderItem->price,
                            'subtotal' => (float) $orderItem->subtotal,
                            'product' => $item ? [
                                'id' => $item->id,
                                'name' => $item->name ?? 'Product Name',
                                'description' => $item->description ?? '',
                                'price' => (float) $item->price,
                                'unit' => $item->unit ?? 'pc',
                                'image' => $item->image ? asset('storage/' . $item->image) : null,
                                'rating' => (float) ($item->rating ?? 4.5),
                                'farmer' => $item->user ? [
                                    'id' => $item->user->id,
                                    'name' => $item->user->name ?? 'Unknown Farmer',
                                    'phone' => $item->user->phone ?? '',
                                    'rating' => 4.5,
                                ] : [
                                    'id' => null,
                                    'name' => 'Unknown Farmer',
                                    'phone' => '',
                                    'rating' => 4.5,
                                ],
                                'category' => $item->category ? [
                                    'id' => $item->category->id,
                                    'name' => $item->category->name ?? 'Uncategorized',
                                ] : [
                                    'id' => null,
                                    'name' => 'Uncategorized',
                                ],
                                'province' => $item->province ? [
                                    'id' => $item->province->id,
                                    'province_name' => $item->province->province_name ?? 'Unknown Province',
                                    'city' => $item->province->city ?? 'Unknown City',
                                ] : [
                                    'id' => null,
                                    'province_name' => 'Unknown Province',
                                    'city' => 'Unknown City',
                                ],
                            ] : [
                                'id' => null,
                                'name' => 'Product Not Available',
                                'description' => '',
                                'price' => 0,
                                'unit' => 'pc',
                                'image' => null,
                                'rating' => 0,
                                'farmer' => [
                                    'id' => null,
                                    'name' => 'Unknown Farmer',
                                    'phone' => '',
                                    'rating' => 0,
                                ],
                                'category' => [
                                    'id' => null,
                                    'name' => 'Uncategorized',
                                ],
                                'province' => [
                                    'id' => null,
                                    'province_name' => 'Unknown Province',
                                    'city' => 'Unknown City',
                                ],
                            ]
                        ];
                    })
                ];
            });

            return response()->json([
                'message' => 'Orders retrieved successfully',
                'data' => $transformedOrders,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Order retrieval error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Error retrieving orders',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'address' => 'required|string|max:500',
                'items' => 'required|array|min:1',
                'items.*.item_id' => 'required|exists:items,id',
                'items.*.quantity' => 'required|integer|min:1',
            ]);

            $totalPrice = 0;
            $orderItems = [];

            foreach ($validated['items'] as $itemData) {
                $item = Item::findOrFail($itemData['item_id']);
                $subtotal = $item->price * $itemData['quantity'];
                $totalPrice += $subtotal;

                $orderItems[] = [
                    'item_id' => $itemData['item_id'],
                    'quantity' => $itemData['quantity'],
                    'price' => $item->price,
                    'subtotal' => $subtotal,
                ];
            }

            $order = Order::create([
                'user_id' => Auth::id(),
                'address' => $validated['address'],
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            $order->load([
                'items' => function($query) {
                    $query->with([
                        'item' => function($itemQuery) {
                            $itemQuery->with(['user', 'category', 'province']);
                        }
                    ]);
                }
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'data' => $this->transformOrder($order),
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error creating order',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $order = Order::with([
                    'user', 
                    'items' => function($query) {
                        $query->with([
                            'item' => function($itemQuery) {
                                $itemQuery->with(['user', 'category', 'province']);
                            }
                        ]);
                    }
                ])
                ->where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            return response()->json([
                'message' => 'Order retrieved successfully',
                'data' => $this->transformOrder($order)
            ], 200);

        } catch (\Exception $e) {
            Log::error('Order show error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error retrieving order',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $order = Order::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            $validated = $request->validate([
                'address' => 'sometimes|required|string|max:500',
                'status' => 'sometimes|in:pending,confirmed,cancelled,delivered',
            ]);

            $order->update($validated);
            $order->load([
                'items' => function($query) {
                    $query->with([
                        'item' => function($itemQuery) {
                            $itemQuery->with(['user', 'category', 'province']);
                        }
                    ]);
                }
            ]);

            return response()->json([
                'message' => 'Order updated successfully',
                'data' => $this->transformOrder($order),
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Order update error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error updating order',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $order = Order::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found'
                ], 404);
            }

            $order->items()->delete();
            $order->delete();

            return response()->json([
                'message' => 'Order deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Order deletion error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Error deleting order',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    private function transformOrder($order)
    {
        return [
            'id' => $order->id,
            'total_price' => (float) $order->total_price,
            'status' => $order->status,
            'address' => $order->address,
            'created_at' => $order->created_at->toISOString(),
            'updated_at' => $order->updated_at->toISOString(),
            'items' => $order->items->map(function ($orderItem) {
                $item = $orderItem->item;
                return [
                    'id' => $orderItem->id,
                    'quantity' => $orderItem->quantity,
                    'price' => (float) $orderItem->price,
                    'subtotal' => (float) $orderItem->subtotal,
                    'product' => $item ? [
                        'id' => $item->id,
                        'name' => $item->name ?? 'Product Name',
                        'description' => $item->description ?? '',
                        'price' => (float) $item->price,
                        'unit' => $item->unit ?? 'pc',
                        'image' => $item->image ? asset('storage/' . $item->image) : null,
                        'rating' => (float) ($item->rating ?? 4.5),
                        'farmer' => $item->user ? [
                            'id' => $item->user->id,
                            'name' => $item->user->name ?? 'Unknown Farmer',
                            'phone' => $item->user->phone ?? '',
                            'rating' => 4.5,
                        ] : [
                            'id' => null,
                            'name' => 'Unknown Farmer',
                            'phone' => '',
                            'rating' => 4.5,
                        ],
                        'category' => $item->category ? [
                            'id' => $item->category->id,
                            'name' => $item->category->name ?? 'Uncategorized',
                        ] : [
                            'id' => null,
                            'name' => 'Uncategorized',
                        ],
                        'province' => $item->province ? [
                            'id' => $item->province->id,
                            'province_name' => $item->province->province_name ?? 'Unknown Province',
                            'city' => $item->province->city ?? 'Unknown City',
                        ] : [
                            'id' => null,
                            'province_name' => 'Unknown Province',
                            'city' => 'Unknown City',
                        ],
                    ] : [
                        'id' => null,
                        'name' => 'Product Not Available',
                        'description' => '',
                        'price' => 0,
                        'unit' => 'pc',
                        'image' => null,
                        'rating' => 0,
                        'farmer' => [
                            'id' => null,
                            'name' => 'Unknown Farmer',
                            'phone' => '',
                            'rating' => 0,
                        ],
                        'category' => [
                            'id' => null,
                            'name' => 'Uncategorized',
                        ],
                        'province' => [
                            'id' => null,
                            'province_name' => 'Unknown Province',
                            'city' => 'Unknown City',
                        ],
                    ]
                ];
            })
        ];
    }
}
