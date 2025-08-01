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
                'province' => $item->province,
                'description' => $item->description,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'status' => $item->stock > 0 ? 'active' : 'out_of_stock',
                'orders' => $item->orders ?? 0,
            ];
        }); // ✅ Close map() function here correctly

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
            'province' => 'required|string|max:255', // ✅ added
            'description' => 'nullable|string', // ✅ added
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name',
            'name_kh',
            'category_id',
            'price',
            'stock',
            'unit',
            'unit_kh',
            'province',
            'description' // ✅ added
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
                'province' => $item->province, // ✅ added
                'description' => $item->description, // ✅ added
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
            'province' => 'required|string|max:255', // ✅ added
            'description' => 'nullable|string', // ✅ added
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->only([
            'name',
            'name_kh',
            'category_id',
            'price',
            'stock',
            'unit',
            'unit_kh',
            'province',
            'description' // ✅ added
        ]);

        if ($request->hasFile('image')) {
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
                'province' => $item->province, // ✅ added
                'description' => $item->description, // ✅ added
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
}
