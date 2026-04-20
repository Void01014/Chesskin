<?php

namespace App\Http\Controllers;

use App\Models\Puzzle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PlayController extends Controller
{
    public function index()
    {
        return Inertia::render('Play/Play', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function puzzle()
    {
        $puzzles = Puzzle::orderBy('id', 'asc')->get();
        $solvedPuzzleIds = auth()->user()->puzzles()->pluck('puzzle_id')->toArray();

        return Inertia::render('Play/Puzzle', [
            'puzzles' => $puzzles,
            'solvedPuzzleIds' => $solvedPuzzleIds
        ]);
    }
}
