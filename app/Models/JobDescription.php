<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobDescription extends Model
{
    protected $fillable = [
        'title',
        'pdf_path',
        'jd_text',
        'status',
        'processed_at',
    ];

    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }
}
