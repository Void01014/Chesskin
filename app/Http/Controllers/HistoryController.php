<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameHistoryResource;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Psy\Readline\Interactive\Input\History;

class HistoryController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $history = Game::where('user_id', $user->id)
            ->latest()
            ->get();


        dd($history);

        return;

        return Inertia::render('History/History', [
            'history' => GameHistoryResource::collection($history),
        ]);
    }
}
