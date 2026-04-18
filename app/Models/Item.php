<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{

    protected $fillable = [
        'name',
        'type',
        'price',
        'folder',
        'slug',
        'bundle_id',
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    public function bundle()
    {
        return $this->belongsTo(Bundle::class);
    }
}
