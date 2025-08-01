<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    // GET /api/items
    public function index()
    {
        $items = Item::with(['category', 'user'])->get();
        return response()->json($items);
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

    // POST /api/items
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'province' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'orders' => 'nullable|integer|min:0',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/items', $imageName);
            $data['image'] = $imageName;
        }

        $item = Item::create($data);
        $item->load(['category', 'user']);

        return response()->json($item, 201);
    }

    // PUT /api/items/{id}
    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'unit' => 'sometimes|required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'province' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'orders' => 'nullable|integer|min:0',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Delete old image
            if ($item->image && Storage::exists('public/items/' . $item->image)) {
                Storage::delete('public/items/' . $item->image);
            }
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/items', $imageName);
            $data['image'] = $imageName;
        }

        $item->update($data);
        $item->load(['category', 'user']);

        return response()->json($item);
    }

    // DELETE /api/items/{id}
    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        if ($item->image && Storage::exists('public/items/' . $item->image)) {
            Storage::delete('public/items/' . $item->image);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
