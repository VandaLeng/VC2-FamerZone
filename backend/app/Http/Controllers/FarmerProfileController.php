<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class FarmerProfileController extends Controller
{
    // ✅ Get authenticated farmer profile
    public function show(Request $request)
    {
        $user = $request->user();

        if ($user->role->name !== 'farmer') {
            return response()->json([
                'message' => 'អ្នកមិនមែនជាកសិករ ទេ'
            ], 403);
        }

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'province' => $user->province?->name ?? null,
                'image' => $user->image ? asset('storage/'.$user->image) : null,
                'role' => $user->role->name,
            ]
        ]);
    }

    // ✅ Update profile info
    public function update(Request $request)
    {
        $user = $request->user();

        if ($user->role->name !== 'farmer') {
            return response()->json(['message' => 'អ្នកមិនមានសិទ្ធិ'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'province' => 'nullable|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'province_id' => $request->province, // assuming province ID
        ]);

        return response()->json([
            'message' => 'ប្រវត្តិរូបបានធ្វើបច្ចុប្បន្នភាពជោគជ័យ',
            'data' => $user
        ]);
    }

    // ✅ Upload/update profile image
    public function uploadImage(Request $request)
    {
        $user = $request->user();

        if ($user->role->name !== 'farmer') {
            return response()->json(['message' => 'អ្នកមិនមានសិទ្ធិ'], 403);
        }

        $request->validate([
            'image' => 'required|image|max:2048', // max 2MB
        ]);

        // Delete old image if exists
        if ($user->image && Storage::exists($user->image)) {
            Storage::delete($user->image);
        }

        $path = $request->file('image')->store('profiles', 'public');
        $user->update(['image' => $path]);

        return response()->json([
            'message' => 'រូបថតបានផ្ទុកជោគជ័យ',
            'image_url' => asset('storage/'.$path),
        ]);
    }
}
