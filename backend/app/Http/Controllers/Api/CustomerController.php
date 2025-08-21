<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    // 🔹 Get all customers
    public function index()
    {
        $customers = Customer::latest()->get();
        return response()->json(['success' => true, 'data' => $customers]);
    }

    // 🔹 Create a new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|unique:customers',
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:customers',
            'phone'       => 'required|string',
            'location'    => 'nullable|string|max:255',
            'status'      => 'required|in:active,inactive,blocked',
            'avatar'      => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('customer_avatars', 'public');
        }

        $customer = Customer::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Customer created successfully.',
            'data' => $customer
        ], 201);
    }

    // 🔹 Get single customer
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['success' => false, 'message' => 'Customer not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $customer]);
    }

    // 🔹 Update customer
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['success' => false, 'message' => 'Customer not found'], 404);
        }

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:customers,email,' . $id,
            'phone'    => 'sometimes|string',
            'location' => 'sometimes|string|max:255',
            'status'   => 'sometimes|in:active,inactive,blocked',
            'avatar'   => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            if ($customer->avatar && Storage::disk('public')->exists($customer->avatar)) {
                Storage::disk('public')->delete($customer->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('customer_avatars', 'public');
        }

        $customer->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Customer updated successfully.',
            'data' => $customer
        ]);
    }

    // 🔹 Delete customer
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['success' => false, 'message' => 'Customer not found'], 404);
        }

        if ($customer->avatar && Storage::disk('public')->exists($customer->avatar)) {
            Storage::disk('public')->delete($customer->avatar);
        }

        $customer->delete();

        return response()->json(['success' => true, 'message' => 'Customer deleted successfully']);
    }

    // 🔹 Filter customers
    public function filter(Request $request)
    {
        $query = Customer::query();

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $customers = $query->get();

        return response()->json(['success' => true, 'data' => $customers]);
    }
}
