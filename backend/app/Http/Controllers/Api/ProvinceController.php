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