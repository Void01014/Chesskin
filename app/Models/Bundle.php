<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bundle extends Model
{
    protected $fillable = ['name', 'price', 'description'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
