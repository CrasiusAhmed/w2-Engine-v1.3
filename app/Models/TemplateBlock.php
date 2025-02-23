<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_template_id',
        'unique_class',
        'html_content',
        'first_class',
        'background_type',
        'background_url',
        'background_linear',
        'background_radial',
        'background_linear_rgba',
    ];

    public function userTemplate()
    {
        return $this->belongsTo(UserTemplate::class);
    }
}
