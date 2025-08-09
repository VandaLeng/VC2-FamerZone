<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('category')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'name_kh' => $item->name_kh,
                'category_id' => $item->category_id,
                'price' => $item->price,
                'stock' => $item->stock,
                'unit' => $item->unit,
                'unit_kh' => $item->unit_kh,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                'orders' => $item->orders ?? 0,
                // Optional province field passthrough if exists
                'province' => $item->province ?? null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $items
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'name_kh' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string|in:kg,lb,piece,dozen,liter',
            'unit_kh' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'province' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name', 'name_kh', 'category_id', 'price', 'stock', 'unit', 'unit_kh', 'province'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            $data['image'] = $path;
        }

        $item = Item::create($data);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $item->id,
                'name' => $item->name,
                'name_kh' => $item->name_kh,
                'category_id' => $item->category_id,
                'price' => $item->price,
                'stock' => $item->stock,
                'unit' => $item->unit,
                'unit_kh' => $item->unit_kh,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                'orders' => $item->orders ?? 0,
                'province' => $item->province ?? null,
            ]
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'name_kh' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string|in:kg,lb,piece,dozen,liter',
            'unit_kh' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'province' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name', 'name_kh', 'category_id', 'price', 'stock', 'unit', 'unit_kh', 'province'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $path = $request->file('image')->store('items', 'public');
            $data['image'] = $path;
        }

        $item->update($data);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $item->id,
                'name' => $item->name,
                'name_kh' => $item->name_kh,
                'category_id' => $item->category_id,
                'price' => $item->price,
                'stock' => $item->stock,
                'unit' => $item->unit,
                'unit_kh' => $item->unit_kh,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                'orders' => $item->orders ?? 0,
                'province' => $item->province ?? null,
            ]
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
            'message' => 'Item deleted successfully'
        ]);
    }

    public function filter(Request $request)
    {
        $query = Item::query();

        // Province comes as slug string (e.g., 'kandal') stored in items.province
        $province = $request->query('province') ?? $request->query('province_id');
        if ($province && $province !== 'all') {
            $query->where('province', $province);
        }

        // Category can be provided as 'category' or 'category_id'
        $category = $request->query('category') ?? $request->query('category_id');
        if ($category && $category !== 'all') {
            $query->where('category_id', $category);
        }

        // Search in name and name_kh
        $search = $request->query('search');
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_kh', 'like', "%{$search}%");
            });
        }

        // Price range
        $minPrice = $request->query('min_price');
        $maxPrice = $request->query('max_price');
        if ($minPrice !== null && $maxPrice !== null) {
            $query->whereBetween('price', [$minPrice, $maxPrice]);
        }

        // Optional: location radius filter if you later store lat/lng per province elsewhere
        // For now, just ignore geo filter on backend; frontend already computes distance if present

        $items = $query->with('category')->orderByDesc('id')->get();

        $mapped = $items->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'name_kh' => $item->name_kh,
                'category_id' => $item->category_id,
                'category' => $item->category ? [
                    'id' => $item->category->id,
                    'name' => $item->category->name,
                ] : null,
                'price' => $item->price,
                'stock' => $item->stock,
                'unit' => $item->unit,
                'unit_kh' => $item->unit_kh,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                'orders' => $item->orders ?? 0,
                'province' => $item->province ?? null,
                // No distance computed here
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $mapped,
        ]);
    }
}
