<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class FarmerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', ''); // Default to empty string if not provided

        $farmers = User::with(['roles', 'province'])
            ->whereHas('roles', function ($query) {
                $query->where('name', 'farmer');
            })
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($user) {
                // Fallback for missing relationships
                $totalProducts = method_exists($user, 'products') ? $user->products()->count() : 0;
                $totalSales = method_exists($user, 'orders') ? $user->orders()->sum('total') : 0;
                $specialties = method_exists($user, 'specialties') ? $user->specialties()->pluck('specialty')->all() : ['N/A'];

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone ?? 'N/A',
                    'location' => optional($user->province)->province_name ?? 'N/A',
                    'joinDate' => optional($user->created_at)->toDateString() ?? '',
                    'lastLogin' => optional($user->updated_at)->toDateString() ?? '',
                    'status' => $user->status ?? 'active',
                    'totalProducts' => $totalProducts,
                    'totalSales' => $totalSales,
                    'rating' => $user->rating ?? 0,
                    'specialties' => $specialties
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $farmers->items(),
            'current_page' => $farmers->currentPage(),
            'last_page' => $farmers->lastPage(),
            'total' => $farmers->total()
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:20',
            'province_id' => 'required|exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,pending,inactive',
            'specialties' => 'nullable|array',
            'specialties.*' => 'string|max:255'
        ]);

        $imageName = 'default.jpg';
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);
        }

        $farmer = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'province_id' => $validated['province_id'],
            'image' => $imageName,
            'status' => $validated['status'] ?? 'active'
        ]);

        $farmer->assignRole('farmer');

        if (!empty($validated['specialties'])) {
            foreach ($validated['specialties'] as $specialty) {
                $farmer->specialties()->create(['specialty' => $specialty]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer created successfully',
            'data' => $farmer->load('roles', 'province', 'specialties')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $farmer = User::whereHas('roles', function ($query) {
            $query->where('name', 'farmer');
        })->findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'province_id' => 'sometimes|required|exists:provinces,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'nullable|in:active,pending,inactive',
            'specialties' => 'nullable|array',
            'specialties.*' => 'string|max:255'
        ]);

        if ($request->hasFile('image')) {
            if ($farmer->image && $farmer->image !== 'default.jpg' && Storage::exists('public/users/' . $farmer->image)) {
                Storage::delete('public/users/' . $farmer->image);
            }
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/users', $imageName);
            $validated['image'] = $imageName;
        }

        $farmer->update($request->only(['name', 'email', 'phone', 'province_id', 'status', 'image']));

        if ($request->has('specialties')) {
            $farmer->specialties()->delete();
            foreach ($validated['specialties'] as $specialty) {
                $farmer->specialties()->create(['specialty' => $specialty]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer updated successfully',
            'data' => $farmer->load('roles', 'province', 'specialties')
        ], 200);
    }

    public function destroy($id)
    {
        $farmer = User::whereHas('roles', function ($query) {
            $query->where('name', 'farmer');
        })->findOrFail($id);

        if ($farmer->image && $farmer->image !== 'default.jpg' && Storage::exists('public/users/' . $farmer->image)) {
            Storage::delete('public/users/' . $farmer->image);
        }

        $farmer->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer deleted successfully'
        ], 200);
    }

    public function show($id)
    {
        $farmer = User::whereHas('roles', function ($query) {
            $query->where('name', 'farmer');
        })->with(['roles', 'province', 'specialties'])->findOrFail($id);

        $totalProducts = method_exists($farmer, 'products') ? $farmer->products()->count() : 0;
        $totalSales = method_exists($farmer, 'orders') ? $farmer->orders()->sum('total') : 0;
        $specialties = method_exists($farmer, 'specialties') ? $farmer->specialties()->pluck('specialty')->all() : ['N/A'];

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $farmer->id,
                'name' => $farmer->name,
                'email' => $farmer->email,
                'phone' => $farmer->phone ?? 'N/A',
                'location' => optional($farmer->province)->province_name ?? 'N/A',
                'joinDate' => optional($farmer->created_at)->toDateString() ?? '',
                'lastLogin' => optional($farmer->updated_at)->toDateString() ?? '',
                'status' => $farmer->status ?? 'active',
                'totalProducts' => $totalProducts,
                'totalSales' => $totalSales,
                'rating' => $farmer->rating ?? 0,
                'specialties' => $specialties
            ]
        ], 200);
    }
}