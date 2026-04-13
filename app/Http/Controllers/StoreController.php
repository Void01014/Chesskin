<?php

namespace App\Http\Controllers;

use App\Models\item_variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        $variants = item_variant::all();
        return Inertia::render('Store', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
