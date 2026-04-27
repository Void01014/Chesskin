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
    return Inertia::render('Welcome');
})->name('welcome');

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
    Route::post('equip', [InventoryController::class, 'equip'])->name('equip');

    Route::get('puzzle', [PlayController::class, 'puzzle'])->name('puzzle');
    Route::post('/puzzle/{puzzle}/completed', [PlayController::class, 'completed'])
        ->name('puzzle.completed');
});

require __DIR__ . '/auth.php';
