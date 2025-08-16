<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VideoProduct extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'farmer_id',
        'title',
        'url',
        'description',
        'thumbnail',
        'is_active',
        'status',
        'video_id',
        'views'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'views' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['embed_url', 'thumbnail_url', 'formatted_views', 'time_ago'];

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-extract video ID when creating/updating
        static::saving(function ($model) {
            $model->video_id = $model->extractVideoId($model->url);
        });
    }

    /**
     * Get the farmer that owns the video.
     */
    public function farmer()
    {
        return $this->belongsTo(\App\Models\User::class, 'farmer_id');
    }

    /**
     * Extract video ID from URL
     */
    public function extractVideoId($url)
    {
        if (!$url) return null;
        
        // YouTube patterns
        $patterns = [
            '/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/',
            '/youtube\.com\/v\/([^&\n?#]+)/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }

    /**
     * Convert YouTube URL to embed URL
     */
    public function getEmbedUrlAttribute()
    {
        if ($this->video_id) {
            return 'https://www.youtube.com/embed/' . $this->video_id . '?rel=0&modestbranding=1&autoplay=0';
        }
        
        return $this->url;
    }

    /**
     * Get video thumbnail
     */
    public function getThumbnailUrlAttribute()
    {
        // Use custom thumbnail if available
        if ($this->thumbnail && \Storage::disk('public')->exists($this->thumbnail)) {
            return asset('storage/' . $this->thumbnail);
        }

        // Generate YouTube thumbnail if it's a YouTube video
        if ($this->video_id) {
            // Try high quality first, fallback to medium quality
            return 'https://img.youtube.com/vi/' . $this->video_id . '/maxresdefault.jpg';
        }

        return asset('images/default-video-thumbnail.jpg'); // Default fallback
    }

    /**
     * Get medium quality thumbnail
     */
    public function getMediumThumbnailAttribute()
    {
        if ($this->video_id) {
            return 'https://img.youtube.com/vi/' . $this->video_id . '/mqdefault.jpg';
        }
        return $this->thumbnail_url;
    }

    /**
     * Increment view count
     */
    public function incrementViews()
    {
        $this->increment('views');
    }

    /**
     * Scope a query to only include active videos.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include approved videos.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope a query to only include pending videos.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include public videos (active and approved).
     */
    public function scopePublic($query)
    {
        return $query->where('is_active', true)->where('status', 'approved');
    }

    /**
     * Scope for popular videos (most viewed)
     */
    public function scopePopular($query, $limit = 6)
    {
        return $query->orderBy('views', 'desc')->limit($limit);
    }

    /**
     * Scope for recent videos
     */
    public function scopeRecent($query, $limit = 6)
    {
        return $query->orderBy('created_at', 'desc')->limit($limit);
    }

    /**
     * Get formatted view count
     */
    public function getFormattedViewsAttribute()
    {
        $views = $this->views ?? 0;
        
        if ($views >= 1000000) {
            return round($views / 1000000, 1) . 'M';
        } elseif ($views >= 1000) {
            return round($views / 1000, 1) . 'K';
        }
        return (string) $views;
    }

    /**
     * Get time ago
     */
    public function getTimeAgoAttribute()
    {
        if (!$this->created_at) {
            return 'Recently';
        }
        
        try {
            return $this->created_at->diffForHumans();
        } catch (\Exception $e) {
            return 'Recently';
        }
    }

    /**
     * Get video duration (if available from YouTube API)
     */
    public function getDurationAttribute()
    {
        // This would require YouTube API integration
        // For now, return null or implement YouTube API call
        return null;
    }

    /**
     * Check if video is YouTube video
     */
    public function getIsYoutubeVideoAttribute()
    {
        return !empty($this->video_id);
    }

    /**
     * Get video platform
     */
    public function getPlatformAttribute()
    {
        if ($this->video_id) {
            return 'YouTube';
        }
        
        // Add other platform detection logic here
        return 'Other';
    }

    /**
     * Scope to get videos by farmer
     */
    public function scopeByFarmer($query, $farmerId)
    {
        return $query->where('farmer_id', $farmerId);
    }

    /**
     * Scope to get videos with minimum views
     */
    public function scopeWithMinViews($query, $minViews = 1)
    {
        return $query->where('views', '>=', $minViews);
    }

    /**
     * Get related videos (same farmer, excluding current)
     */
    public function getRelatedVideos($limit = 3)
    {
        return static::where('farmer_id', $this->farmer_id)
            ->where('id', '!=', $this->id)
            ->public()
            ->orderBy('views', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Search videos by title or description
     */
    public function scopeSearch($query, $searchTerm)
    {
        return $query->where(function($q) use ($searchTerm) {
            $q->where('title', 'like', '%' . $searchTerm . '%')
              ->orWhere('description', 'like', '%' . $searchTerm . '%');
        });
    }
}