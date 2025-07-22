<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();

        // Add image URL
        $categories->transform(function ($category) {
            $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('category_images', 'public');
        }

        $category = Category::create($validated);
        $category->image_url = $category->image ? asset('storage/' . $category->image) : null;

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        $category->image_url = $category->image ? asset('storage/' . $category->image) : null;

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }



public function update(Request $request, $id)
{
    $category = Category::findOrFail($id);

    $validated = $request->validate([
        'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {
        // Delete old image if exists
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        // Store new image
        $validated['image'] = $request->file('image')->store('category_images', 'public');
    }

    $category->update($validated);

    // Add full image URL
    $category->image_url = $category->image ? asset('storage/' . $category->image) : null;

    return response()->json([
        'success' => true,
        'message' => 'Category updated successfully.',
        'data' => $category
    ]);
}


    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.'
        ]);
    }
}