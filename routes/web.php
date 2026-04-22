<?php

use App\Http\Controllers\historyController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PlayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::get('play', [PlayController::class, 'index'])->name('play');
    Route::post('storeGame', [PlayController::class, 'storeGame'])->name('storeGame');

    Route::get('history', [HistoryController::class, 'index'])->name('history');

    Route::get('shop', [StoreController::class, 'index'])->name('shop');
    Route::post('purchase', [StoreController::class, 'purchase'])->middleware('auth');
    Route::get('inventory', [InventoryController::class, 'index'])->middleware('auth')->name('inventory');

    Route::get('puzzle', [PlayController::class, 'puzzle'])->name('puzzle');
    Route::post('/puzzle/{puzzle}/completed', [PlayController::class, 'completed'])
        ->name('puzzle.completed');
});

require __DIR__ . '/auth.php';
