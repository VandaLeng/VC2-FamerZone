<?php

namespace App\Http\Controllers\Api;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    // GET /api/items
    public function index(Request $request)
    {
        try {
            // Load items with their relationships
            $items = Item::with([
                'user',
                'category',
                'province'
            ])
                ->active()
                ->get();

            // Transform the data to include all necessary fields
            $transformedItems = $items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price' => (float) $item->price,
                    'stock' => (int) $item->stock,
                    'unit' => $item->unit,
                    'image' => $item->image,
                    'image_url' => $item->image ? url('storage/' . $item->image) : null,
                    'status' => $item->status,
                    'orders' => (int) $item->orders,
                    'rating' => (float) $item->rating,
                    'category_id' => $item->category_id,
                    'user_id' => $item->user_id,
                    'province_id' => $item->province_id,
                    'is_popular' => $item->orders > 10 || $item->rating > 4.0,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,

                    // Include relationship data
                    'user' => $item->user ? [
                        'id' => $item->user->id,
                        'name' => $item->user->name,
                        'phone' => $item->user->phone ?? 'N/A',
                        'avatar' => $item->user->avatar ? url('storage/' . $item->user->avatar) : null,
                        'rating' => (float) ($item->user->rating ?? 0),
                    ] : null,

                    'category' => $item->category ? [
                        'id' => $item->category->id,
                        'name' => $item->category->name,
                    ] : null,

                    'province' => $item->province ? [
                        'id' => $item->province->id,
                        'province_name' => $item->province->province_name,
                        'latitude' => (float) $item->province->latitude,
                        'longitude' => (float) $item->province->longitude,
                        'city' => $item->province->city,
                        'country' => $item->province->country,
                    ] : null,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedItems,
                'message' => 'Items retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve items: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    // POST /api/items
    public function store(Request $request)
    {
        try {
            Log::info('Store item request received', $request->all());

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'unit' => 'required|string|max:50',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
                'status' => 'nullable|in:active,inactive',
                'orders' => 'nullable|integer|min:0',
                'category_id' => 'required|integer|exists:categories,id',
                'user_id' => 'required|integer|exists:users,id',
                'province_id' => 'required|string|exists:provinces,id',
            ]);

            if ($validator->fails()) {
                Log::warning('Validation failed for store item', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $validator->validated();

            // Ensure status defaults to active if not provided
            $data['status'] = $data['status'] ?? 'active';
            $data['orders'] = $data['orders'] ?? 0;
            $data['rating'] = 3.5 + (rand(0, 15) / 10); // Random rating between 3.5-5.0

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('items', 'public');
                $data['image'] = $imagePath;
                Log::info('Image uploaded', ['path' => $imagePath]);
            }

            $item = Item::create($data);
            $item->load(['category', 'user', 'province']);

            Log::info('Item created successfully', ['item_id' => $item->id]);

            return response()->json([
                'success' => true,
                'message' => 'Item created successfully',
                'data' => $this->formatItem($item)
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating item: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to create item: ' . $e->getMessage(),
            ], 500);
        }
    }

    // GET /api/items/{id}
    public function show($id)
    {
        try {
            $item = Item::with(['user', 'category', 'province'])->findOrFail($id);

            $transformedItem = [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => (float) $item->price,
                'stock' => (int) $item->stock,
                'unit' => $item->unit,
                'image' => $item->image,
                'image_url' => $item->image ? url('storage/' . $item->image) : null,
                'status' => $item->status,
                'orders' => (int) $item->orders,
                'rating' => (float) $item->rating,
                'category_id' => $item->category_id,
                'user_id' => $item->user_id,
                'province_id' => $item->province_id,
                'is_popular' => $item->orders > 10 || $item->rating > 4.0,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,

                'user' => $item->user ? [
                    'id' => $item->user->id,
                    'name' => $item->user->name,
                    'phone' => $item->user->phone ?? 'N/A',
                    'avatar' => $item->user->avatar ? url('storage/' . $item->user->avatar) : null,
                    'rating' => (float) ($item->user->rating ?? 0),
                ] : null,

                'category' => $item->category ? [
                    'id' => $item->category->id,
                    'name' => $item->category->name,
                ] : null,

                'province' => $item->province ? [
                    'id' => $item->province->id,
                    'province_name' => $item->province->province_name,
                    'latitude' => (float) $item->province->latitude,
                    'longitude' => (float) $item->province->longitude,
                    'city' => $item->province->city,
                    'country' => $item->province->country,
                ] : null,
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedItem,
                'message' => 'Item retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found: ' . $e->getMessage(),
                'data' => null
            ], 404);
        }
    }

    // PUT /api/items/{id}
    public function update(Request $request, $id)
    {
        try {
            $item = Item::with(['category', 'user', 'province'])->find($id);

            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|nullable|string',
                'price' => 'sometimes|numeric|min:0',
                'stock' => 'sometimes|integer|min:0',
                'unit' => 'sometimes|string',
                'status' => 'sometimes|in:active,inactive',
                'orders' => 'sometimes|integer|min:0',
                'category_id' => 'sometimes|integer|exists:categories,id',
                'user_id' => 'sometimes|integer|exists:users,id',
                'province_id' => 'sometimes|string|exists:provinces,id',
                'image' => 'sometimes|nullable|image|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $validated = $validator->validated();

            if ($request->hasFile('image')) {
                if ($item->image) {
                    Storage::delete('public/' . $item->image);
                }
                $imagePath = $request->file('image')->store('items', 'public');
                $validated['image'] = $imagePath;
            }

            $item->update($validated);
            $item->load(['category', 'user', 'province']);

            return response()->json([
                'success' => true,
                'message' => 'Item updated successfully.',
                'data' => $this->formatItem($item)
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update item: ' . $e->getMessage(),
            ], 500);
        }
    }

    // DELETE /api/items/{id}
    public function destroy($id)
    {
        try {
            $item = Item::find($id);

            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found'
                ], 404);
            }

            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }

            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete item: ' . $e->getMessage(),
            ], 500);
        }
    }

    // GET /api/items/filtered
    public function filter(Request $request)
    {
        try {
            Log::info('Filter request received', $request->all());

            $query = Item::query()->with(['category', 'user', 'province']);

            // Province filter
            if ($request->has('province_id') && $request->province_id !== 'all' && !empty($request->province_id)) {
                $query->where('province_id', $request->province_id);
                Log::info('Applied province filter', ['province_id' => $request->province_id]);
            }

            // Category filter
            if ($request->has('category') && $request->category !== 'all' && !empty($request->category)) {
                $query->where('category_id', $request->category);
                Log::info('Applied category filter', ['category' => $request->category]);
            }

            // Search filter
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('name', 'like', '%' . $searchTerm . '%')
                        ->orWhere('description', 'like', '%' . $searchTerm . '%');
                });
                Log::info('Applied search filter', ['search' => $searchTerm]);
            }

            // Price range filter
            if ($request->has('min_price') && $request->has('max_price')) {
                $minPrice = $request->min_price;
                $maxPrice = $request->max_price;
                if ($maxPrice > 0) {
                    $query->whereBetween('price', [$minPrice, $maxPrice]);
                    Log::info('Applied price filter', ['min' => $minPrice, 'max' => $maxPrice]);
                }
            }

            // Location-based filtering
            $latitude = $request->query('latitude');
            $longitude = $request->query('longitude');
            $radius = $request->query('radius', 50);

            if ($latitude && $longitude && $radius && $radius != 500) {
                $query->whereHas('province', function ($provinceQuery) use ($latitude, $longitude, $radius) {
                    $provinceQuery->whereRaw(
                        "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?",
                        [$latitude, $longitude, $latitude, $radius]
                    );
                });
                Log::info('Applied location filter', ['lat' => $latitude, 'lng' => $longitude, 'radius' => $radius]);
            }

            // Only active items
            $query->where('status', 'active');

            // Get items with ordering
            $items = $query->orderBy('created_at', 'desc')->get();

            Log::info('Items filtered successfully', ['count' => $items->count()]);

            // Calculate distances and format items
            $formattedItems = $items->map(function ($item) use ($latitude, $longitude) {
                $formatted = $this->formatItem($item);

                // Calculate distance if user location is provided
                if ($latitude && $longitude && $item->province) {
                    $distance = $this->calculateDistance(
                        $latitude,
                        $longitude,
                        $item->province->latitude,
                        $item->province->longitude
                    );
                    $formatted['distance'] = round($distance, 2);
                }

                return $formatted;
            });

            // Sort by distance if location is provided
            if ($latitude && $longitude) {
                $formattedItems = $formattedItems->sortBy('distance')->values();
            }

            return response()->json([
                'success' => true,
                'data' => $formattedItems,
                'meta' => [
                    'total' => $formattedItems->count(),
                    'radius' => $radius,
                    'user_location' => [
                        'latitude' => $latitude,
                        'longitude' => $longitude
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error filtering items: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch products: ' . $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    // GET /api/items/nearby - Get nearby products
    public function nearby(Request $request)
    {
        $latitude = $request->query('latitude');
        $longitude = $request->query('longitude');
        $radius = $request->query('radius', 20); // Default 20km

        if (!$latitude || !$longitude) {
            return response()->json([
                'success' => false,
                'message' => 'Latitude and longitude are required'
            ], 400);
        }

        $items = Item::with(['category', 'user', 'province'])
            ->where('status', 'active')
            ->whereHas('province', function ($query) use ($latitude, $longitude, $radius) {
                $query->whereRaw(
                    "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?",
                    [$latitude, $longitude, $latitude, $radius]
                );
            })
            ->get();

        $formattedItems = $items->map(function ($item) use ($latitude, $longitude) {
            $formatted = $this->formatItem($item);
            $formatted['distance'] = round($this->calculateDistance(
                $latitude,
                $longitude,
                $item->province->latitude,
                $item->province->longitude
            ), 2);
            return $formatted;
        })->sortBy('distance')->values();

        return response()->json([
            'success' => true,
            'data' => $formattedItems,
            'meta' => [
                'total' => $formattedItems->count(),
                'radius' => $radius
            ]
        ]);
    }

    // GET /api/items/popular - Get popular products
    public function popular()
    {
        $items = Item::with(['category', 'user', 'province'])
            ->where('status', 'active')
            ->orderBy('orders', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items->map(function ($item) {
                return $this->formatItem($item);
            })
        ]);
    }

    // Helper method to calculate distance between two points
    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371; // Earth's radius in kilometers
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c;
    }

    // Helper method to format item response to match frontend expectations
    private function formatItem($item)
    {
        // Generate consistent rating and reviews based on item ID
        $rating = 3.5 + (($item->id % 15) / 10); // 3.5 to 5.0
        $reviews = 5 + ($item->id % 95); // 5 to 100
        $isPopular = $item->orders > 10 || ($item->id % 3 === 0); // Popular if many orders or every 3rd item

        return [
            'id' => $item->id,
            'title' => $item->name,
            'titleKh' => $item->name,
            'name' => $item->name,
            'nameKh' => $item->name,
            'price' => (float) $item->price,
            'currency' => '$',
            'stock' => $item->stock,
            'unit' => $item->unit,
            'image' => $item->image ? asset('storage/' . $item->image) : null,
            'description' => $item->description ?? 'Fresh agricultural product',
            'descriptionKh' => $item->description ?? 'ផលិតផលកសិកម្មស្រស់',
            'status' => $item->status,
            'orders' => $item->orders ?? 0,
            'rating' => round($rating, 1),
            'reviews' => $reviews,
            'isPopular' => $isPopular,
            'createdAt' => $item->created_at->toISOString(),
            'category' => $item->category ? [
                'id' => $item->category->id,
                'name' => $item->category->name
            ] : null,
            'farmer' => $item->user ? [
                'id' => $item->user->id,
                'name' => $item->user->name,
                'nameKh' => $item->user->name,
                'avatar' => null,
                'phone' => $item->user->phone ?? '+855 12 345 678',
                'rating' => round(4.0 + (($item->user->id % 10) / 10), 1),
            ] : null,
            'province' => $item->province ? [
                'id' => $item->province->id,
                'province_name' => $item->province->province_name,
                'nameKh' => $item->province->nameKh ?? $item->province->province_name,
                'latitude' => (float) $item->province->latitude,
                'longitude' => (float) $item->province->longitude,
                'city' => $item->province->city,
                'country' => $item->province->country,
            ] : null,
        ];
    }
}