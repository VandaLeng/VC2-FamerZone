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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name', 'name_kh', 'category_id', 'price', 'stock', 'unit', 'unit_kh'
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
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name', 'name_kh', 'category_id', 'price', 'stock', 'unit', 'unit_kh'
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

    if ($request->has('province') && $request->province !== 'all') {
        $query->where('province', $request->province);
    }

    if ($request->has('category') && $request->category !== 'all') {
        $query->where('category_id', $request->category);
    }

    if ($request->has('search') && $request->search !== '') {
        $query->where('title', 'like', '%' . $request->search . '%');
    }

    // Example: filter price between min and max
    if ($request->has('min_price') && $request->has('max_price')) {
        $query->whereBetween('price', [$request->min_price, $request->max_price]);
    }

    $items = $query->with('category')->get();

    return response()->json([
        'success' => true,
        'data' => $items
    ]);
}

}
