<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VideoProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class VideoProductController extends Controller
{
    /**
     * Get all videos for admin management
     */
    public function adminIndex()
    {
        try {
            $videos = VideoProduct::orderBy('created_at', 'desc')
                ->get()
                ->map(function ($video) {
                    return [
                        'id' => $video->id,
                        'title' => $video->title,
                        'url' => $video->url,
                        'description' => $video->description,
                        'thumbnail_url' => $video->thumbnail_url,
                        'is_active' => $video->is_active,
                        'status' => $video->status,
                        'views' => $video->views,
                        'formatted_views' => $video->formatted_views,
                        'video_id' => $video->video_id,
                        'embed_url' => $video->embed_url,
                        'time_ago' => $video->time_ago,
                        'created_at' => $video->created_at,
                        'updated_at' => $video->updated_at,
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $videos
            ], 200);
        } catch (\Exception $e) {
            Log::error('Admin video fetch error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create new video by admin
     */
    public function adminStore(Request $request)
    {
        try {
            Log::info('Admin video store request:', $request->all());

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|string|url|max:2048',
                'description' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                Log::warning('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Extract video ID from URL
            $videoId = $this->extractVideoIdFromUrl($request->url);
            
            $videoData = [
                'admin_id' => auth()->id(),
                'title' => trim($request->title),
                'url' => trim($request->url),
                'description' => $request->description ? trim($request->description) : null,
                'video_id' => $videoId,
                'is_active' => true,
                'status' => 'approved',
                'views' => 0
            ];

            Log::info('Creating video with data:', $videoData);

            $video = VideoProduct::create($videoData);

            // Reload the video to get all computed attributes
            $video = VideoProduct::find($video->id);

            $responseData = [
                'id' => $video->id,
                'title' => $video->title,
                'url' => $video->url,
                'description' => $video->description,
                'thumbnail_url' => $video->thumbnail_url,
                'is_active' => $video->is_active,
                'status' => $video->status,
                'views' => $video->views,
                'formatted_views' => $video->formatted_views,
                'video_id' => $video->video_id,
                'embed_url' => $video->embed_url,
                'time_ago' => $video->time_ago,
                'created_at' => $video->created_at,
                'updated_at' => $video->updated_at,
            ];

            Log::info('Video created successfully:', $responseData);

            return response()->json([
                'success' => true,
                'message' => 'Video created successfully!',
                'data' => $responseData
            ], 201);
        } catch (\Exception $e) {
            Log::error('Admin video creation error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create video: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update video by admin
     */
    public function adminUpdate(Request $request, VideoProduct $videoProduct)
    {
        try {
            Log::info('Admin video update request:', $request->all());

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'url' => 'required|string|url|max:2048',
                'description' => 'nullable|string|max:1000',
                'is_active' => 'nullable|boolean',
                'status' => 'nullable|in:pending,approved,rejected'
            ]);

            if ($validator->fails()) {
                Log::warning('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Extract video ID from URL
            $videoId = $this->extractVideoIdFromUrl($request->url);

            $updateData = [
                'title' => trim($request->title),
                'url' => trim($request->url),
                'description' => $request->description ? trim($request->description) : null,
                'video_id' => $videoId,
                'is_active' => $request->has('is_active') ? (bool)$request->is_active : $videoProduct->is_active,
                'status' => $request->status ?? $videoProduct->status
            ];

            $videoProduct->update($updateData);

            // Reload to get computed attributes
            $videoProduct = $videoProduct->fresh();

            $responseData = [
                'id' => $videoProduct->id,
                'title' => $videoProduct->title,
                'url' => $videoProduct->url,
                'description' => $videoProduct->description,
                'thumbnail_url' => $videoProduct->thumbnail_url,
                'is_active' => $videoProduct->is_active,
                'status' => $videoProduct->status,
                'views' => $videoProduct->views,
                'formatted_views' => $videoProduct->formatted_views,
                'video_id' => $videoProduct->video_id,
                'embed_url' => $videoProduct->embed_url,
                'time_ago' => $videoProduct->time_ago,
                'created_at' => $videoProduct->created_at,
                'updated_at' => $videoProduct->updated_at,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Video updated successfully',
                'data' => $responseData
            ], 200);
        } catch (\Exception $e) {
            Log::error('Admin video update error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete video by admin
     */
    public function adminDestroy(VideoProduct $videoProduct)
    {
        try {
            $videoProduct->delete();

            return response()->json([
                'success' => true,
                'message' => 'Video deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Admin video deletion error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete video: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle video status by admin
     */
    public function adminToggleStatus(VideoProduct $videoProduct)
    {
        try {
            $videoProduct->update(['is_active' => !$videoProduct->is_active]);
            
            // Reload to get updated data
            $videoProduct = $videoProduct->fresh();

            $status = $videoProduct->is_active ? 'activated' : 'deactivated';

            $responseData = [
                'id' => $videoProduct->id,
                'title' => $videoProduct->title,
                'url' => $videoProduct->url,
                'description' => $videoProduct->description,
                'thumbnail_url' => $videoProduct->thumbnail_url,
                'is_active' => $videoProduct->is_active,
                'status' => $videoProduct->status,
                'views' => $videoProduct->views,
                'formatted_views' => $videoProduct->formatted_views,
                'video_id' => $videoProduct->video_id,
                'embed_url' => $videoProduct->embed_url,
                'time_ago' => $videoProduct->time_ago,
                'created_at' => $videoProduct->created_at,
                'updated_at' => $videoProduct->updated_at,
            ];

            return response()->json([
                'success' => true,
                'message' => "Video {$status} successfully",
                'data' => $responseData
            ], 200);
        } catch (\Exception $e) {
            Log::error('Admin video status toggle error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update video status: ' . $e->getMessage(),
                'error' => $e->getMessage()
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
            
            $videos = VideoProduct::where('is_active', true)
                ->where('status', 'approved')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get()
                ->map(function ($video) {
                    return [
                        'id' => $video->id,
                        'title' => $video->title,
                        'url' => $video->url,
                        'description' => $video->description,
                        'thumbnail_url' => $video->thumbnail_url,
                        'is_active' => $video->is_active,
                        'status' => $video->status,
                        'views' => $video->views,
                        'formatted_views' => $video->formatted_views,
                        'video_id' => $video->video_id,
                        'embed_url' => $video->embed_url,
                        'time_ago' => $video->time_ago,
                        'created_at' => $video->created_at,
                        'updated_at' => $video->updated_at,
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $videos
            ], 200);
        } catch (\Exception $e) {
            Log::error('Public videos fetch error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch videos',
                'error' => $e->getMessage()
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
                $videoProduct->increment('views');
                
                return response()->json([
                    'success' => true,
                    'message' => 'View count updated'
                ], 200);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Video not available'
            ], 404);
        } catch (\Exception $e) {
            Log::error('View increment error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update view count',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Extract YouTube video ID from URL
     */
    private function extractVideoIdFromUrl($url)
    {
        if (!$url) return null;
        
        $patterns = [
            '/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/',
            '/youtube\.com\/v\/([^&\n?#]+)/',
            '/youtube\.com\/embed\/([^&\n?#]+)/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }
}