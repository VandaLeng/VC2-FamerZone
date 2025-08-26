<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class VideoProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'title',
        'url',
        'description',
        'thumbnail',
        'is_active',
        'status',
        'video_id',
        'views'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'views' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['embed_url', 'thumbnail_url', 'formatted_views', 'time_ago'];

    /**
     * Get the admin that owns the video
     */
    public function admin()
    {
        return $this->belongsTo(\App\Models\User::class, 'admin_id');
    }

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->video_id && $model->url) {
                $model->video_id = $model->extractVideoId($model->url);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('url')) {
                $model->video_id = $model->extractVideoId($model->url);
            }
        });
    }

    /**
     * Extract YouTube video ID from URL
     */
    public function extractVideoId($url)
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

    /**
     * Get embed URL
     */
    public function getEmbedUrlAttribute()
    {
        if ($this->video_id) {
            return 'https://www.youtube.com/embed/' . $this->video_id . '?rel=0&modestbranding=1&autoplay=0';
        }
        return $this->url;
    }

    /**
     * Get thumbnail URL
     */
    public function getThumbnailUrlAttribute()
    {
        // First check if there's a custom thumbnail
        if ($this->thumbnail && Storage::disk('public')->exists($this->thumbnail)) {
            return asset('storage/' . $this->thumbnail);
        }

        // Use YouTube thumbnail if video_id exists
        if ($this->video_id) {
            return 'https://img.youtube.com/vi/' . $this->video_id . '/maxresdefault.jpg';
        }

        return null;
    }

    /**
     * Get formatted views
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
     * Increment view count
     */
    public function incrementViews()
    {
        $this->increment('views');
        return $this;
    }

    /**
     * Scope for active videos
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for public videos
     */
    public function scopePublic($query)
    {
        return $query->where('is_active', true)->where('status', 'approved');
    }

    /**
     * Scope for recent videos
     */
    public function scopeRecent($query, $limit = 6)
    {
        return $query->orderBy('created_at', 'desc')->limit($limit);
    }

    /**
     * Scope for popular videos
     */
    public function scopePopular($query, $limit = 6)
    {
        return $query->orderBy('views', 'desc')->limit($limit);
    }
}