<?php

use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FarmerController;
use App\Http\Controllers\API\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);


    // User management
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('/admin/trashed-users', [AdminController::class, 'getTrashedUsers']);
    Route::post('/admin/users/{id}/restore', [AdminController::class, 'restoreUser']);

    // Roles
    Route::get('/roles', [RoleController::class, 'index']); 
    Route::post('/roles', [RoleController::class, 'store']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

    // Permissions
    Route::get('/permissions', [PermissionController::class, 'index']);
    Route::post('/permissions', [PermissionController::class, 'store']);
    Route::put('/permissions/{id}', [PermissionController::class, 'update']);
    Route::delete('/permissions/{id}', [PermissionController::class, 'destroy']);
    Route::post('/permissions/assign-role', [PermissionController::class, 'assignToRole']);

    // Assign roles
    Route::post('/users/{id}/assign-role', [UserController::class, 'assignRole']);
    Route::post('/users/{id}/remove-role', [UserController::class, 'removeRole']);

    Route::post('/users/{id}/assign-permission', [UserController::class, 'assignPermission']);

    Route::post('/users/{id}/upload-image', [UserController::class, 'uploadImage']);

});

Route::middleware(['auth:sanctum', 'role:farmer'])->group(function () {
    Route::get('/farmer/products', [FarmerController::class, 'index']);
    Route::post('/farmer/products', [FarmerController::class, 'store']);
    Route::get('/farmer/products/{id}', [FarmerController::class, 'show']);
    Route::put('/farmer/products/{id}', [FarmerController::class, 'update']);
    Route::delete('/farmer/products/{id}', [FarmerController::class, 'destroy']);

});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::put('/profile', [UserController::class, 'updateProfile']);

    // Change password route
    Route::post('/users/change-password', [UserController::class, 'changePassword']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('roles');
});

// Route::middleware(['auth:sanctum', 'permission:manage users'])->group(function () {
//     Route::get('/admin/users', [AdminController::class, 'getUsers']);
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('orders', \App\Http\Controllers\Api\OrderController::class);
});