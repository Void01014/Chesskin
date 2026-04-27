<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Bundle;
use App\Models\Inventory;
use App\Models\Item;
use App\Models\User;
use App\Models\UserEquippedPiece;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'equipped_board_id' => 13,
            'credits' => 5000,
            'is_admin' => false,
        ]);

        $classicBundle = Bundle::with('items')
            ->where('name', 'Classic Set')
            ->first();

        $classicBoard = Item::find(13);

        Inventory::create([
            'user_id' => $user->id,
            'item_id' => $classicBoard->id,
        ]);

        if ($classicBundle) {
            foreach ($classicBundle->items as $item) {
                Inventory::create([
                    'user_id' => $user->id,
                    'item_id' => $item->id,
                ]);

                UserEquippedPiece::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'piece' => $item->slug,
                    ],
                    [
                        'item_id' => $item->id,
                    ]
                );
            }
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('welcome', absolute: false));
    }
}
