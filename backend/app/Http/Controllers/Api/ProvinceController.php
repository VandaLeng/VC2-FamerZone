<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function index()
    {
        $provinces = Province::all();
        return response()->json([
            'success' => true,
            'data' => $this->formatProvinces($provinces)
        ], 200);
    }

    /*
    // Disabled to prevent dynamic province creation
    public function store(Request $request)
    {
        $validated = $request->validate([
            'province_name' => 'required|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        $validated['user_id'] = auth()->id();

        $province = Province::create($validated);

        return response()->json([
            'success' => true,
            'data' => $this->formatProvince($province),
            'message' => 'Province created successfully',
        ], 201);
    }
    */

    private function formatProvince($province)
    {
        return [
            'id' => $province->id,
            'province_name' => $province->province_name,
            'nameKh' => $province->nameKh,
            'latitude' => (float) $province->latitude,
            'longitude' => (float) $province->longitude,
            'city' => $province->city,
            'country' => $province->country,
            'created_at' => $province->created_at->toISOString(),
        ];
    }

    private function formatProvinces($provinces)
    {
        return $provinces->map(function ($province) {
            return $this->formatProvince($province);
        });
    }
}