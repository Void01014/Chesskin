<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $items = $user->items()->with('bundle')->get();
        
        return Inertia::render('Inventory', [
            'items' => $items
        ]);
    }
}
