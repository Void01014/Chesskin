<?php

namespace App\Http\Controllers;

use App\Models\Bot;
use App\Models\Bundle;
use App\Models\Item;
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

        $equipped_pieces = Auth::user()->equippedPieces()->with('item:id,folder,slug')->get();

        $randomBundle = Bundle::with('items')->inRandomOrder()->first();

        return Inertia::render('Play/Play', [
            'bots' => $bots,
            'equipped_pieces' => $equipped_pieces,
            'equipped_board' => Item::find(Auth::user()->equipped_board_id),
            'random_bundle' => $randomBundle?->items,
        ]);
    }

    public function storeGame(Request $request)
    {
        $request->validate([
            'mode' => 'required|in:pvp,pvai',
            'bot_id' => 'nullable|integer',
            'player_color' => 'required|string',
            'winner' => 'nullable|integer|in:1,2',
            'moves' => 'required|array',
        ]);

        $user = auth()->user();

        // Save the game
        $game = $user->games()->create($request->all());


        if ($game->user_won) {
            $user->increment('credits', 10);
        }

        return redirect()->back();
    }

    public function puzzle()
    {
        $puzzles = Puzzle::orderBy('id', 'asc')->get();
        $solvedPuzzleIds = auth()->user()->puzzles()->pluck('puzzle_id')->toArray();

        $equipped_pieces = Auth::user()->equippedPieces()->with('item:id,folder,slug')->get();

        $randomBundle = Bundle::with('items')->inRandomOrder()->first();


        return Inertia::render('Play/Puzzle', [
            'puzzles' => $puzzles,
            'solvedPuzzleIds' => $solvedPuzzleIds,
            'equipped_pieces' => $equipped_pieces,
            'equipped_board' => Item::find(Auth::user()->equipped_board_id),
            'random_bundle' => $randomBundle?->items,
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

        $user->increment('credits', 10);

        return redirect()->back();
    }
}
