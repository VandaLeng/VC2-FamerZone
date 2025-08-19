<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FarmerController;
use App\Http\Controllers\API\BuyerController;
use App\Http\Controllers\API\VideoProductController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\OrderController;
// use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\Api\ProvinceController;

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderItemController;
use App\Models\Order;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('roles');
});

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Routes
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// ===== PUBLIC VIDEO ROUTES =====
Route::prefix('videos')->group(function () {
    Route::get('/all', [VideoProductController::class, 'getAllVideos']);
    Route::post('/public/{videoProduct}/view', [VideoProductController::class, 'incrementView']);
});

// Public API routes for items
Route::apiResource('items', ItemController::class);
Route::get('/items/filtered', [ItemController::class, 'filter']);
Route::get('/items/nearby', [ItemController::class, 'nearby']);
Route::get('/items/popular', [ItemController::class, 'popular']);

// Categories
Route::apiResource('categories', CategoryController::class);

// Orders (public read access)
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{order}', [OrderController::class, 'show']);

// Order Items
Route::apiResource('order-items', OrderItemController::class);


// Provinces
Route::prefix('provinces')->group(function () {
    Route::get('/', [ProvinceController::class, 'index']);
    Route::get('/{id}', [ProvinceController::class, 'show']);
});
// Route::get('/provinces', [ProvinceController::class, 'index']);

// Authenticated User Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::post('/profile/image', [UserController::class, 'updateImage']);
    Route::post('/users/change-password', [UserController::class, 'changePassword']);
    
    // Orders for authenticated users
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{order}', [OrderController::class, 'update']);
    Route::delete('/orders/{order}', [OrderController::class, 'destroy']);
});

// Admin Routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // User Management
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
    Route::get('/admin/trashed-users', [AdminController::class, 'getTrashedUsers']);
    Route::post('/admin/users/{id}/restore', [AdminController::class, 'restoreUser']);
    
    // Roles Management
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
    
    // Permissions Management
    Route::get('/permissions', [PermissionController::class, 'index']);
    Route::post('/permissions', [PermissionController::class, 'store']);
    Route::put('/permissions/{id}', [PermissionController::class, 'update']);
    Route::delete('/permissions/{id}', [PermissionController::class, 'destroy']);
    Route::post('/permissions/assign-role', [PermissionController::class, 'assignToRole']);
    
    // Assign roles and permissions
    Route::post('/users/{id}/assign-role', [UserController::class, 'assignRole']);
    Route::post('/users/{id}/remove-role', [UserController::class, 'removeRole']);
    Route::post('/users/{id}/assign-permission', [UserController::class, 'assignPermission']);
    Route::post('/users/{id}/upload-image', [UserController::class, 'uploadImage']);
});

// Farmer Routes
Route::middleware(['auth:sanctum', 'role:farmer'])->group(function () {
    // Product Management
    Route::get('/farmer/products', [FarmerController::class, 'index']);
    Route::post('/farmer/products', [FarmerController::class, 'store']);
    Route::get('/farmer/products/{id}', [FarmerController::class, 'show']);
    Route::put('/farmer/products/{id}', [FarmerController::class, 'update']);
    Route::delete('/farmer/products/{id}', [FarmerController::class, 'destroy']);
    
    // ===== FARMER VIDEO MANAGEMENT =====
    Route::prefix('video-products')->group(function () {
        Route::get('/', [VideoProductController::class, 'index']);
        Route::post('/', [VideoProductController::class, 'store']);
        Route::put('/{videoProduct}', [VideoProductController::class, 'update']);
        Route::delete('/{videoProduct}', [VideoProductController::class, 'destroy']);
        Route::post('/{videoProduct}/toggle-status', [VideoProductController::class, 'toggleStatus']);
    });
});

// Buyer Routes
Route::middleware(['auth:sanctum', 'role:buyer'])->group(function () {
    Route::get('/buyer/products', [BuyerController::class, 'index']);
    Route::get('/buyer/products/{id}', [BuyerController::class, 'show']);
    Route::post('/buyer/products/{id}/buy', [BuyerController::class, 'buy']);
    
    // Buyer specific orders
    Route::get('/buyer/orders', [BuyerController::class, 'orders']);
    Route::get('/buyer/orders/{id}', [BuyerController::class, 'showOrder']);
});



    // Customers
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::get('/customers/{id}', [CustomerController::class, 'show']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    // Provinces
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [FarmerProfileController::class, 'show']);
    Route::put('/profile', [FarmerProfileController::class, 'update']);
    Route::post('/profile/image', [FarmerProfileController::class, 'uploadImage']);
});
