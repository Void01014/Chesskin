<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bundle extends Model
{
    protected $fillable = ['name', 'price', 'description'];

    /**
     * The items that belong to the bundle.
     */
    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class);
    }
}