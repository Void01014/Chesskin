<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Item;
use App\Models\UserEquippedPiece;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $equippedIds = $user->getEquippedItemIds();

        $items = $user->items()->with('bundle')->get()
            ->map(function ($item) use ($equippedIds) {
                $item->is_equipped = in_array($item->id, $equippedIds);
                return $item;
            });

        return Inertia::render('Inventory', [
            'items' => $items
        ]);
    }

    public function equip(Request $request)
    {
        $request->validate([
            'item_id' => 'nullable|exists:items,id',
            'bundle_id' => 'nullable|exists:bundles,id',
        ]);

        if (!$request->item_id && !$request->bundle_id) {
            return response()->json(['error' => 'Nothing to purchase'], 400);
        }
        if ($request->item_id && $request->bundle_id) {
            return response()->json(['error' => 'Invalid request'], 400);
        }

        $user = Auth::user();

        DB::transaction(function () use ($request, $user) {
            if ($request->bundle_id) {
                $bundle = Bundle::with('items')->findOrFail($request->bundle_id);

                foreach ($bundle->items as $item) {
                    $owns = $user->inventories()
                        ->where('item_id', $item->id)
                        ->exists();

                    if (! $owns) {
                        continue;
                    }
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
                return back()->with('success', 'Equipped successfully');
            } else {
                $item = Item::find($request->item_id);

                if ($item->type === 'piece') {
                    UserEquippedPiece::updateOrCreate(
                        [
                            'user_id' => $user->id,
                            'piece' => $item->slug,
                        ],
                        [
                            'item_id' => $item->id
                        ]
                    );
                } else {
                    $user->equipped_board_id = $item->id;

                    $user->save();
                }
                return back()->with('success', 'Equipped successfully');
            }
        });
    }
}
