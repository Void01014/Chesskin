<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Puzzle extends Model
{
    protected $casts = [
        'positions' => 'string',
        'solution' => 'array',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'puzzles_user')
            ->withPivot('solve_time')
            ->withTimestamps();
    }
}
