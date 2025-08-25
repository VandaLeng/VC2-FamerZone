<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    // ✅ Get all provinces - FIXED
    public function index()
    {
        try {
            $provinces = Province::select('id', 'province_name', 'city', 'country', 'latitude', 'longitude')
                ->orderBy('province_name', 'asc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $provinces,
                'message' => 'Provinces retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve provinces',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Get single province
    public function show($id)
    {
        try {
            $province = Province::findOrFail($id);
            
            return response()->json([
                'status' => 'success',
                'data' => $province,
                'message' => 'Province retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Province not found'
            ], 404);
        }
    }

    // ✅ Create new province (Admin only)
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'province_name' => 'required|string|max:255|unique:provinces',
                'city' => 'nullable|string|max:255',
                'country' => 'string|max:255',
                'latitude' => 'nullable|numeric|between:-90,90',
                'longitude' => 'nullable|numeric|between:-180,180',
            ]);

            $province = Province::create([
                'province_name' => $validated['province_name'],
                'city' => $validated['city'] ?? null,
                'country' => $validated['country'] ?? 'Cambodia',
                'latitude' => $validated['latitude'] ?? null,
                'longitude' => $validated['longitude'] ?? null,
            ]);

            return response()->json([
                'status' => 'success',
                'data' => $province,
                'message' => 'Province created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create province',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Update province (Admin only)
    public function update(Request $request, $id)
    {
        try {
            $province = Province::findOrFail($id);

            $validated = $request->validate([
                'province_name' => 'required|string|max:255|unique:provinces,province_name,' . $id,
                'city' => 'nullable|string|max:255',
                'country' => 'string|max:255',
                'latitude' => 'nullable|numeric|between:-90,90',
                'longitude' => 'nullable|numeric|between:-180,180',
            ]);

            $province->update($validated);

            return response()->json([
                'status' => 'success',
                'data' => $province,
                'message' => 'Province updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update province',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ✅ Delete province (Admin only)
    public function destroy($id)
    {
        try {
            $province = Province::findOrFail($id);
            
            // Check if province has users
            if ($province->users()->count() > 0) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot delete province with existing users'
                ], 400);
            }

            $province->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Province deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete province',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}