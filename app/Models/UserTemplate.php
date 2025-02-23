<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTemplate extends Model
{
    use HasFactory;

    protected $casts = [
        'is_custom' => 'boolean',
    ];

    protected $fillable = [
        'user_id',
        'html_content',
        'css_content',
        'hover_css',
        'keyframe_css',
        'media_queries',
        'select_unit',
        'background_data',
        'box_shadows',
        'text_shadows',
        'project_name',
        'is_custom',
    ];

    public function blocks()
    {
        return $this->hasMany(TemplateBlock::class);
    }
}
