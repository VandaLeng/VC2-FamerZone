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

    protected $casts = [
        'is_active' => 'boolean',
        'views' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['embed_url', 'thumbnail_url', 'formatted_views', 'time_ago'];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->video_id = $model->extractVideoId($model->url);
        });
    }

    /**
     * Get the farmer that owns the video
     */
    public function farmer()
    {
        return $this->belongsTo(\App\Models\User::class, 'farmer_id');
    }

    /**
     * Extract YouTube video ID from URL
     */
    public function extractVideoId($url)
    {
        if (!$url) return null;
        
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
     * Get embed URL
     */
    public function getEmbedUrlAttribute()
    {
        if ($this->video_id) {
            return 'https://www.youtube.com/embed/' . $this->video_id . '?rel=0&modestbranding=1';
        }
        return $this->url;
    }

    /**
     * Get thumbnail URL
     */
    public function getThumbnailUrlAttribute()
    {
        if ($this->thumbnail && \Storage::disk('public')->exists($this->thumbnail)) {
            return asset('storage/' . $this->thumbnail);
        }

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