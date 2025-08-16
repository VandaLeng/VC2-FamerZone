<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VideoProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class VideoProductController extends Controller
{
    /**
     * Display a listing of the resource for farmers
     */
    public function index()
    {
        try {
            $videos = VideoProduct::where('farmer_id', Auth::id())
                ->with(['farmer' => function($query) {
                    $query->select('id', 'name', 'email', 'profile_image');
                }])
                ->orderBy('created_at', 'desc')
                ->paginate(15);
            
            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (\Exception $e) {
            Log::error('Video fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of all active videos for public (Homepage)
     */
    public function publicIndex(Request $request)
    {
        try {
            $limit = $request->get('limit', 6);
            $type = $request->get('type', 'recent'); // recent, popular
            
            $query = VideoProduct::public()
                ->with(['farmer' => function($query) {
                    $query->select('id', 'name', 'email', 'profile_image');
                }]);
            
            if ($type === 'popular') {
                $videos = $query->popular($limit)->get();
            } else {
                $videos = $query->recent($limit)->get();
            }
            
            return response()->json([
                'success' => true,
                'data' => $videos,
                'count' => $videos->count(),
                'message' => 'Videos fetched successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Public video fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch public videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|url|max:1000',
                'description' => 'nullable|string|max:1000',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ], [
                'title.required' => 'Video title is required',
                'url.required' => 'Video URL is required',
                'url.url' => 'Please enter a valid URL',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();
            $validatedData['farmer_id'] = Auth::id();
            $validatedData['status'] = 'approved'; // Auto-approve for now
            $validatedData['is_active'] = true;

            // Handle thumbnail upload if provided
            if ($request->hasFile('thumbnail')) {
                $thumbnailPath = $request->file('thumbnail')->store('video_thumbnails', 'public');
                $validatedData['thumbnail'] = $thumbnailPath;
            }

            $video = VideoProduct::create($validatedData);
            $video->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            Log::info('Video created successfully', ['video_id' => $video->id, 'farmer_id' => Auth::id()]);

            return response()->json([
                'success' => true,
                'message' => 'Video created successfully and is now live!',
                'data' => $video
            ], 201);
        } catch (\Exception $e) {
            Log::error('Video creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create video',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(VideoProduct $videoProduct)
    {
        try {
            // Check if the video belongs to the authenticated farmer or is public
            if (Auth::check() && $videoProduct->farmer_id !== Auth::id() && !$videoProduct->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $videoProduct->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            return response()->json([
                'success' => true,
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video show error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch video',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VideoProduct $videoProduct)
    {
        try {
            // Check if the video belongs to the authenticated farmer
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|url|max:1000',
                'description' => 'nullable|string|max:1000',
                'is_active' => 'boolean',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validatedData = $validator->validated();

            // Handle thumbnail upload if provided
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($videoProduct->thumbnail) {
                    Storage::disk('public')->delete($videoProduct->thumbnail);
                }
                $thumbnailPath = $request->file('thumbnail')->store('video_thumbnails', 'public');
                $validatedData['thumbnail'] = $thumbnailPath;
            }

            $videoProduct->update($validatedData);
            $videoProduct->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            Log::info('Video updated successfully', ['video_id' => $videoProduct->id]);

            return response()->json([
                'success' => true,
                'message' => 'Video updated successfully',
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VideoProduct $videoProduct)
    {
        try {
            // Check if the video belongs to the authenticated farmer
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            // Delete thumbnail if exists
            if ($videoProduct->thumbnail) {
                Storage::disk('public')->delete($videoProduct->thumbnail);
            }

            $videoProduct->delete();

            Log::info('Video deleted successfully', ['video_id' => $videoProduct->id]);

            return response()->json([
                'success' => true,
                'message' => 'Video deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Video deletion error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete video',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle video active status
     */
    public function toggleStatus(VideoProduct $videoProduct)
    {
        try {
            // Check if the video belongs to the authenticated farmer
            if ($videoProduct->farmer_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access'
                ], 403);
            }

            $videoProduct->update(['is_active' => !$videoProduct->is_active]);
            $videoProduct->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            $status = $videoProduct->is_active ? 'activated' : 'deactivated';
            Log::info('Video status toggled', ['video_id' => $videoProduct->id, 'status' => $status]);

            return response()->json([
                'success' => true,
                'message' => "Video {$status} successfully",
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video status toggle error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get my videos for authenticated farmer
     */
    public function myVideos()
    {
        try {
            $videos = VideoProduct::where('farmer_id', Auth::id())
                ->with(['farmer' => function($query) {
                    $query->select('id', 'name', 'email', 'profile_image');
                }])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (\Exception $e) {
            Log::error('My videos fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch your videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all videos for homepage (without authentication) - MAIN ENDPOINT FOR HOMEPAGE
     */
    public function getAllVideos(Request $request)
    {
        try {
            $limit = $request->get('limit', 8);
            
            $videos = VideoProduct::public()
                ->with(['farmer' => function($query) {
                    $query->select('id', 'name', 'email', 'profile_image');
                }])
                ->recent($limit)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $videos,
                'count' => $videos->count()
            ]);
        } catch (\Exception $e) {
            Log::error('All videos fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Increment view count for public video viewing
     */
    public function incrementView(VideoProduct $videoProduct)
    {
        try {
            // Only increment if video is active and approved
            if ($videoProduct->is_active && $videoProduct->status === 'approved') {
                $videoProduct->incrementViews();
                
                return response()->json([
                    'success' => true,
                    'message' => 'View count updated',
                    'views' => $videoProduct->views
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Video not available for viewing'
            ], 404);
        } catch (\Exception $e) {
            Log::error('View increment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update view count'
            ], 500);
        }
    }

    /**
     * Admin methods for video management
     */
    public function adminIndex()
    {
        try {
            $videos = VideoProduct::with(['farmer' => function($query) {
                    $query->select('id', 'name', 'email', 'profile_image');
                }])
                ->orderBy('created_at', 'desc')
                ->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $videos
            ]);
        } catch (\Exception $e) {
            Log::error('Admin video fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Approve video (admin only)
     */
    public function approve(VideoProduct $videoProduct)
    {
        try {
            $videoProduct->update([
                'status' => 'approved',
                'is_active' => true
            ]);
            $videoProduct->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            Log::info('Video approved', ['video_id' => $videoProduct->id]);

            return response()->json([
                'success' => true,
                'message' => 'Video approved successfully',
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video approval error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to approve video',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reject video (admin only)
     */
    public function reject(VideoProduct $videoProduct)
    {
        try {
            $videoProduct->update([
                'status' => 'rejected',
                'is_active' => false
            ]);
            $videoProduct->load(['farmer' => function($query) {
                $query->select('id', 'name', 'email', 'profile_image');
            }]);

            Log::info('Video rejected', ['video_id' => $videoProduct->id]);

            return response()->json([
                'success' => true,
                'message' => 'Video rejected successfully',
                'data' => $videoProduct
            ]);
        } catch (\Exception $e) {
            Log::error('Video rejection error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject video',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}