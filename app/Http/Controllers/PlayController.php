<?php

namespace App\Http\Controllers;

use App\Models\Bot;
use App\Models\Puzzle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class PlayController extends Controller
{
    public function index()
    {
        $bots = Bot::all();

        return Inertia::render('Play/Play', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'bots' => $bots
        ]);
    }

    public function storeGame(Request $request)
    {
        $request->validate([
            'mode' => 'required|in:pvp,pvai',
            'bot_id' => 'nullable|integer',
            'player_color' => 'required|string',
            'winner' => 'required|integer|in:0,1,2',
            'moves' => 'required|array',
        ]);

        auth()->user()->games()->create($request->all());

        return redirect()->back();
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

    public function completed(Request $request, Puzzle $puzzle)
    {
        $user = $request->user();

        // Validate input
        $data = $request->validate([
            'solve_time' => ['required', 'integer', 'min:0'],
        ]);

        // Prevent duplicate completion
        if ($user->puzzles()->where('puzzle_id', $puzzle->id)->exists()) {
            return;
        }

        // Attach puzzle to user (pivot table)
        $user->puzzles()->attach($puzzle->id, [
            'solve_time' => $data['solve_time'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back();
    }
}
