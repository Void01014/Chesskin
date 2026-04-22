<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Game extends Model
{

    protected $fillable = [
        'user_id',
        'bot_id',
        'mode',
        'player_color',
        'winner',
        'moves',
    ];


    protected $casts = [
        'moves' => 'array',
        'created_at' => 'datetime',
    ];

    protected $appends = [
        'user_won',
        'is_draw',
        'move_count',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }



    public function getUserWonAttribute(): bool
    {
        if (is_null($this->winner)) return false;

        $playerMap = ['white' => 1, 'black' => 2];
        $playerValue = $playerMap[$this->player_color] ?? null;

        return $this->winner === $playerValue;
    }

    public function getIsDrawAttribute(): bool
    {
        return is_null($this->winner);
    }

    public function getMoveCountAttribute(): int
    {
        return count($this->moves ?? []);
    }
}
