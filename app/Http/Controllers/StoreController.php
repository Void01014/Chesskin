<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $sets = Bundle::with('items')
            ->addSelect([
                'is_owned' => DB::table('inventories')
                    ->join('items', 'inventories.item_id', '=', 'items.id')
                    ->selectRaw(1)
                    ->whereColumn('items.bundle_id', 'bundles.id')
                    ->where('inventories.user_id', $userId)
                    ->limit(1)
            ])
            ->get()->map(function ($set) {
                $set->is_bundle = true;
                $set->folder = $set->items->first()?->folder;
                return $set;
            });

        $items = Item::whereNull('bundle_id')
            ->addSelect([
                'is_owned' => DB::table('inventories')
                    ->selectRaw(1)
                    ->whereColumn('inventories.item_id', 'items.id')
                    ->where('inventories.user_id', $userId)
                    ->limit(1)
            ])
            ->get()->map(function ($item) {
                $item->is_bundle  = false;
                return $item;
            });

        return Inertia::render('Store', [
            'variants' => $sets->concat($items)
        ]);
    }

    public function purchase(Request $request)
    {
        $request->validate([
            'item_id' => 'nullable|exists:items,id',
            'bundle_id' => 'nullable|exists:bundles,id',
        ]);

        
        if (! $request->item_id && ! $request->bundle_id) {
            return response()->json(['error' => 'Nothing to purchase'], 400);
        }

        if ($request->item_id && $request->bundle_id) {
            return response()->json(['error' => 'Invalid request'], 400);
        }


        $user = auth()->user();

        return DB::transaction(function () use ($request, $user) {
            if ($request->bundle_id) {
                $bundle = Bundle::with('items')->findOrFail($request->bundle_id);

                // dd($bundle.items);

                foreach ($bundle->items as $item) {
                    Inventory::create([
                        'user_id' => $user->id,
                        'item_id' => $item->id  
                    ]);
                }
            } else {
                $item = Item::findOrFail($request->item_id);

                if ($user->inventories()->where('item_id', $item->id)->exists()) {
                    return response()->json(['error' => 'Already owned'], 409);
                }

                if ($user->credits < $item->price) {
                    return response()->json(['error' => 'Not enough credits'], 402);
                }

                $user->decrement('credits', $item->price);
                $user->save();

                Inventory::create([
                    'user_id' => $user->id,
                    'item_id' => $item->id
                ]);

                $user->credits -= $item->price;
            }
        });
    }
}
