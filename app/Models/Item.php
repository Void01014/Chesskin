<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    public function owners()
    {
        return $this->belongsToMany(User::class, 'inventories');
    }
}
