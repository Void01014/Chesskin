<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserEquippedPiece extends Model
{
    protected $fillable = [
        'user_id',
        'piece',
        'item_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()  
    {
        return $this->belongsTo(Item::class);
    }
}
