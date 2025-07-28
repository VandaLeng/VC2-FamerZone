<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    // Display a listing of the items
    public function index()
    {
        $items = Item::with(['user' => function ($query) {
            $query->withoutGlobalScopes();
        }, 'category'])->get();

        return response()->json(['success' => true, 'data' => $items], 200);
    }

    // Store a newly created item
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'price' => 'required|numeric|min:0',
            'province' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            if (!$path) {
                return response()->json(['success' => false, 'message' => 'Image upload failed'], 500);
            }
            $data['image'] = $path;
        }

        $item = Item::create($data);

        return response()->json(['success' => true, 'data' => $item], 201);
    }

    // Show a single item
    public function show(string $id)
    {
        $item = Item::with(['user', 'category'])->findOrFail($id);
        return response()->json(['success' => true, 'data' => $item], 200);
    }

    // Update an item
    public function update(Request $request, string $id)
    {
        $item = Item::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'price' => 'sometimes|required|numeric|min:0',
            'province' => 'sometimes|required|string|max:100',
            'category_id' => 'sometimes|required|exists:categories,id',
            'user_id' => 'sometimes|exists:users,id', // Added to allow optional update
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        // Handle image update only if a new file is uploaded
        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $path = $request->file('image')->store('items', 'public');
            if (!$path) {
                return response()->json(['success' => false, 'message' => 'Image upload failed'], 500);
            }
            $data['image'] = $path;
        } elseif (!isset($data['image']) && $item->image) {
            // Preserve existing image if no new one is provided
            $data['image'] = $item->image;
        }

        $item->update($data);

        // Refresh the model to get latest data
        $item->refresh();

        return response()->json(['success' => true, 'message' => 'Item updated successfully', 'data' => $item], 200);
    }

    // Delete an item
    public function destroy(string $id)
    {
        $item = Item::findOrFail($id);

        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return response()->json(['success' => true, 'message' => 'Item deleted successfully.']);
    }
}