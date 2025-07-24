<?php

// namespace App\Http\Controllers\API;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use App\Models\Product;
// use Illuminate\Support\Facades\Auth;

// class FarmerController extends Controller
// {
//     public function index()
//     {
//         $products = Product::where('user_id', Auth::id())->get();
//         return response()->json(['products' => $products]);
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required|string',
//             'price' => 'required|numeric',
//             'description' => 'nullable|string',
//         ]);

//         $product = Product::create([
//             'name' => $request->name,
//             'price' => $request->price,
//             'description' => $request->description,
//             'user_id' => Auth::id(),
//         ]);

//         return response()->json(['message' => 'Product created', 'product' => $product]);
//     }

//     public function update(Request $request, $id)
//     {
//         $product = Product::where('user_id', Auth::id())->findOrFail($id);

//         $product->update($request->only('name', 'price', 'description'));

//         return response()->json(['message' => 'Product updated', 'product' => $product]);
//     }

//     public function destroy($id)
//     {
//         $product = Product::where('user_id', Auth::id())->findOrFail($id);

//         $product->delete();

//         return response()->json(['message' => 'Product deleted']);
//     }

//     public function show($id)
//     {
//         $product = Product::where('user_id', Auth::id())->findOrFail($id);
//         return response()->json(['product' => $product]);
//     }
// }
