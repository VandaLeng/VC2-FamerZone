<?php

namespace App\Http\Controllers\Api;

use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    // GET /api/items
    public function index()
    {
        $items = Item::with(['category', 'user'])->get();
        return response()->json($items);
    }

    // POST /api/items
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'unit' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'province' => 'required|string|max:100',
            'description' => 'nullable|string',
            'status' => 'in:active,inactive',
            'orders' => 'integer',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('items', 'public');
        }

        $item = Item::create($data);

        return response()->json(['message' => 'Item created successfully', 'item' => $item], 201);
    }

    // GET /api/items/{id}
    public function show($id)
    {
        $item = Item::with(['category', 'user'])->find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return response()->json($item);
    }

    // PUT or POST (with _method=PUT) /api/items/{id}
    public function update(Request $request, $id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'stock' => 'sometimes|integer',
            'unit' => 'sometimes|string',
            'province' => 'sometimes|string',
            'description' => 'sometimes|string',
            'status' => 'sometimes|string',
            'orders' => 'sometimes|integer',
            'category_id' => 'sometimes|exists:categories,id',
            'user_id' => 'sometimes|exists:users,id',
            'image' => 'sometimes|image|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Optional: delete old image
            if ($item->image) {
                Storage::delete('public/' . $item->image);
            }

            $imagePath = $request->file('image')->store('items', 'public');
            $validated['image'] = $imagePath;
        }

        $item->update($validated);

        return response()->json([
            'message' => 'Item updated successfully.',
            'data' => $item
        ]);
    }
    
    // DELETE /api/items/{id}
    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        if ($item->image && Storage::disk('public')->exists($item->image)) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }

    // Filter items
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
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('min_price') && $request->has('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        $items = $query->with(['category', 'user'])->get();

        return response()->json([
            'success' => true,
            'data' => $items
        ]);
    }
}
