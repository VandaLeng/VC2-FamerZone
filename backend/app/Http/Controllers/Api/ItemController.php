<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with(['category', 'orderItems'])
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'nameKh' => $item->name_kh ?? $item->name,
                    'category' => $item->category ? $item->category->name : null,
                    'categoryKh' => $item->category ? $item->category->name_kh : null,
                    'price' => $item->price,
                    'stock' => $item->stock ?? 0,
                    'unit' => $item->unit ?? 'piece',
                    'unitKh' => $item->unit_kh ?? 'កុំព្យូទ័រ',
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                    'orders' => $item->orderItems->count(),
                    'createdAt' => $item->created_at->toDateString(),
                    'userId' => $item->user_id,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'unit_kh' => 'nullable|string',
        ]);

        $category = Category::where('name', $validated['category'])->firstOrFail();

        $itemData = [
            'name' => $validated['name'],
            'name_kh' => $validated['name_kh'],
            'category_id' => $category->id,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'unit' => $validated['unit'],
            'unit_kh' => $validated['unit_kh'] ?? $validated['unit'],
            'user_id' => auth()->id(),  // current logged in user
        ];

        if ($request->hasFile('image')) {
            $itemData['image'] = $request->file('image')->store('items', 'public');
        }

        $item = Item::create($itemData);

        return response()->json([
            'success' => true,
            'message' => 'Product added successfully',
            'data' => $item,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_kh' => 'required|string|max:255',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'unit_kh' => 'nullable|string',
        ]);

        $category = Category::where('name', $validated['category'])->firstOrFail();

        $itemData = [
            'name' => $validated['name'],
            'name_kh' => $validated['name_kh'],
            'category_id' => $category->id,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'unit' => $validated['unit'],
            'unit_kh' => $validated['unit_kh'] ?? $validated['unit'],
            // optionally update user_id if needed:
            // 'user_id' => auth()->id(),
        ];

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $itemData['image'] = $request->file('image')->store('items', 'public');
        }

        $item->update($itemData);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $item,
        ]);
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
        ]);
    }
}
