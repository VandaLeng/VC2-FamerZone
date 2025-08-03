<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('items')->latest()->get();

        $categories->transform(function ($category) {
            $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
            $category->productCount = $category->items_count;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name.en' => 'required|string|max:255',
            'name.kh' => 'required|string|max:255',
            'description.en' => 'nullable|string',
            'description.kh' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('category_images', 'public');
        }

        $category = Category::create([
            'name' => ['en' => $validated['name']['en'], 'kh' => $validated['name']['kh']],
            'description' => ['en' => $validated['description']['en'] ?? '', 'kh' => $validated['description']['kh'] ?? ''],
            'image' => $validated['image'] ?? null,
            'status' => $validated['status'],
        ]);

        $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
        $category->productCount = $category->items()->count();

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = Category::withCount('items')->findOrFail($id);
        $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
        $category->productCount = $category->items_count;

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name.en' => 'required|string|max:255',
            'name.kh' => 'required|string|max:255',
            'description.en' => 'nullable|string',
            'description.kh' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->hasFile('image')) {
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('category_images', 'public');
        }

        $category->update([
            'name' => ['en' => $validated['name']['en'], 'kh' => $validated['name']['kh']],
            'description' => ['en' => $validated['description']['en'] ?? '', 'kh' => $validated['description']['kh'] ?? ''],
            'image' => $validated['image'] ?? $category->image,
            'status' => $validated['status'],
        ]);

        $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
        $category->productCount = $category->items()->count();

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'data' => $category,
        ]);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.'
        ]);
    }

    public function filter(Request $request)
    {
        $query = Category::withCount('items');

        if ($request->has('name')) {
            $query->where('name->en', 'like', '%' . $request->name . '%')
                  ->orWhere('name->kh', 'like', '%' . $request->name . '%');
        }

        $categories = $query->get();

        $categories->transform(function ($category) {
            $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
            $category->productCount = $category->items_count;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function withItems()
    {
        $categories = Category::has('items')->with('items')->withCount('items')->get();

        $categories->transform(function ($category) {
            $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
            $category->productCount = $category->items_count;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function withoutItems()
    {
        $categories = Category::doesntHave('items')->withCount('items')->get();

        $categories->transform(function ($category) {
            $category->image_url = $category->image ? asset('storage/' . $category->image) : null;
            $category->productCount = $category->items_count;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}