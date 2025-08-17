<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // 🔹 Get all customers
    public function index()
    {
        return response()->json(Customer::all(), 200);
    }

    // 🔹 Create new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|unique:customers',
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:customers',
            'phone'       => 'required|string',
            'status'      => 'in:active,inactive,blocked',
        ]);

        $customer = Customer::create($validated);
        return response()->json($customer, 201);
    }

    // 🔹 Get single customer
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        return response()->json($customer, 200);
    }

    // 🔹 Update customer
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $validated = $request->validate([
            'name'   => 'sometimes|string|max:255',
            'email'  => 'sometimes|email|unique:customers,email,'.$id,
            'phone'  => 'sometimes|string',
            'status' => 'sometimes|in:active,inactive,blocked',
        ]);

        $customer->update($validated);
        return response()->json($customer, 200);
    }

    // 🔹 Delete customer
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully'], 200);
    }
}
