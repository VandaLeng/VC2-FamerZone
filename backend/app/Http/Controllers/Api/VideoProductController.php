<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VideoProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class VideoProductController extends Controller
{
    /**
     * Get farmer's videos
     */
    public function index()
    {
        try {
            $videos = VideoProduct::where('farmer_id', Auth::id())
                ->with(['farmer:id,name,email'])
                ->orderBy('created_at', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (\Exception $e) {
            Log::error('Video fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos'
            ], 500);
        }
    }

    /**
     * Create new video
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|url',
                'description' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $video = VideoProduct::create([
                'farmer_id' => Auth::id(),
                'title' => $request->title,
                'url' => $request->url,
                'description' => $request->description,
                'is_active' => true,
                'status' => 'approved'
            ]);

            $video->load(['farmer:id,name,email']);

            return response()->json([
                'success' => true,
                'message' => 'Video created successfully!',
                'data' => $video
            ], 201);
        } catch (\Exception $e) {
            Log::error('Video creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create video'
            ], 500);
        }
    }

    /**
     * Update video
     */
    public function update(Request $request, VideoProduct $videoProduct)
    {
        try {
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|url',
                'description' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $videoProduct->update([
                'title' => $request->title,
                'url' => $request->url,
                'description' => $request->description,
            ]);

            $videoProduct->load(['farmer:id,name,email']);

            return response()->json([
                'success' => true,
                'message' => 'Video updated successfully',
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video'
            ], 500);
        }
    }

    /**
     * Delete video
     */
    public function destroy(VideoProduct $videoProduct)
    {
        try {
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $videoProduct->delete();

            return response()->json([
                'success' => true,
                'message' => 'Video deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Video deletion error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete video'
            ], 500);
        }
    }

    /**
     * Toggle video status
     */
    public function toggleStatus(VideoProduct $videoProduct)
    {
        try {
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $videoProduct->update(['is_active' => !$videoProduct->is_active]);
            $videoProduct->load(['farmer:id,name,email']);

            $status = $videoProduct->is_active ? 'activated' : 'deactivated';

            return response()->json([
                'success' => true,
                'message' => "Video {$status} successfully",
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video status toggle error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video status'
            ], 500);
        }
    }

    /**
     * Get all public videos for homepage
     */
    public function getAllVideos(Request $request)
    {
        try {
            $limit = $request->get('limit', 6);
            
            $videos = VideoProduct::public()
                ->with(['farmer:id,name,email'])
                ->recent($limit)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (\Exception $e) {
            Log::error('Public videos fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos'
            ], 500);
        }
    }

    /**
     * Increment view count
     */
    public function incrementView(VideoProduct $videoProduct)
    {
        try {
            if ($videoProduct->is_active && $videoProduct->status === 'approved') {
                $videoProduct->incrementViews();
                
                return response()->json([
                    'success' => true,
                    'message' => 'View count updated'
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Video not available'
            ], 404);
        } catch (\Exception $e) {
            Log::error('View increment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update view count'
            ], 500);
        }
    }
}