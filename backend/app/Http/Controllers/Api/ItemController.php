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
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        try {
            $query = Item::where('user_id', auth()->id())->with(['category']);

            if ($request->has('search') && !empty($request->search)) {
                $query->where(function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
                });
            }

            if ($request->has('status') && $request->status !== 'all') {
                if ($request->status === 'out_of_stock') {
                    $query->where('stock', 0);
                } elseif ($request->status === 'low_stock') {
                    $query->where('stock', '>', 0)->where('stock', '<', 10);
                } else {
                    $query->where('status', $request->status);
                }
            }

            if ($request->has('category') && $request->category !== 'all') {
                $query->where('category_id', $request->category);
            }

            $items = $query->get()->map(function ($item) {
                $status = $item->status;
                if ($item->status === 'rejected') {
                    $status = 'rejected';
                } elseif ($item->status === 'pending') {
                    $status = 'pending';
                } elseif ($item->stock === 0) {
                    $status = 'out_of_stock';
                } elseif ($item->stock < 10) {
                    $status = 'low_stock';
                } else {
                    $status = 'active';
                }

                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price' => (float) $item->price,
                    'stock' => (int) $item->stock,
                    'unit' => $item->unit,
                    'image' => $item->image ? url('storage/' . $item->image) : null,
                    'status' => $status,
                    'rating' => (float) ($item->rating ?? 0),
                    'category_id' => $item->category_id,
                    'user_id' => $item->user_id,
                    'province_id' => $item->province_id,
                    'category' => $item->category ? [
                        'id' => $item->category->id,
                        'name' => $item->category->name,
                    ] : null,
                ];
            });

            return response()->json(['items' => $items]);
        } catch (\Exception $e) {
            Log::error('Error fetching items: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch items: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'unit' => 'nullable|string|max:50',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
                'category_id' => 'required|integer|exists:categories,id',
                'province_id' => 'required|string|exists:provinces,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $validator->validated();
            $data['status'] = 'pending';
            $data['user_id'] = auth()->id();
            $data['unit'] = $data['unit'] ?? 'piece';
            $data['rating'] = 0;

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('items', 'public');
            }

            $item = Item::create($data);
            $item->load(['category']);

            return response()->json([
                'success' => true,
                'message' => 'Item created successfully',
                'item' => $this->formatItem($item)
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create item: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $item = Item::where('user_id', auth()->id())->findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|nullable|string',
                'price' => 'sometimes|numeric|min:0',
                'stock' => 'sometimes|integer|min:0',
                'unit' => 'sometimes|string|max:50',
                'image' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
                'category_id' => 'sometimes|integer|exists:categories,id',
                'province_id' => 'sometimes|string|exists:provinces,id',
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
                    Storage::disk('public')->delete($item->image);
                }
                $validated['image'] = $request->file('image')->store('items', 'public');
            }

            $item->update($validated);
            $item->load(['category']);

            return response()->json([
                'success' => true,
                'message' => 'Item updated successfully',
                'item' => $this->formatItem($item)
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update item: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $item = Item::where('user_id', auth()->id())->findOrFail($id);

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

    private function formatItem($item)
    {
        $status = $item->status;
        if ($item->status === 'rejected') {
            $status = 'rejected';
        } elseif ($item->status === 'pending') {
            $status = 'pending';
        } elseif ($item->stock === 0) {
            $status = 'out_of_stock';
        } elseif ($item->stock < 10) {
            $status = 'low_stock';
        } else {
            $status = 'active';
        }

        return [
            'id' => $item->id,
            'name' => $item->name,
            'description' => $item->description,
            'price' => (float) $item->price,
            'stock' => (int) $item->stock,
            'unit' => $item->unit,
            'image' => $item->image ? url('storage/' . $item->image) : null,
            'status' => $status,
            'rating' => (float) ($item->rating ?? 0),
            'category_id' => $item->category_id,
            'user_id' => $item->user_id,
            'province_id' => $item->province_id,
            'category' => $item->category ? [
                'id' => $item->category->id,
                'name' => $item->category->name,
            ] : null,
        ];
    }
}