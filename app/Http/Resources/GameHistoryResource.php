<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'mode' => $this->mode,
            'player_color' => $this->player_color,
            'move_count' => $this->move_count,
            'user_won' => $this->user_won,
            'is_draw' => $this->is_draw,
            'created_at' => $this->created_at,
        ];
    }
}
