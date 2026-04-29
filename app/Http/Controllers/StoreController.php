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

        if (!$request->item_id && !$request->bundle_id)
            return back()->with('error', 'Nothing to purchase');

        if ($request->item_id && $request->bundle_id)
            return back()->with('error', 'Invalid request');

        $user = auth()->user();

        return DB::transaction(function () use ($request, $user) {
            if ($request->bundle_id) {
                $bundle = Bundle::with('items')->findOrFail($request->bundle_id);

                if ($user->credits < $bundle->price)
                    return back()->with('error', 'Not enough credits');

                foreach ($bundle->items as $item) {
                    Inventory::firstOrCreate([
                        'user_id' => $user->id,
                        'item_id' => $item->id
                    ]);
                }

                $user->decrement('credits', $bundle->price);
            } else {
                $item = Item::findOrFail($request->item_id);

                if ($user->inventories()->where('item_id', $item->id)->exists())
                    return back()->with('error', 'You already own this item');

                if ($user->credits < $item->price)
                    return back()->with('error', 'Not enough credits');

                $user->decrement('credits', $item->price);

                Inventory::create([
                    'user_id' => $user->id,
                    'item_id' => $item->id
                ]);
            }

            return back()->with('success', 'Purchase successful');
        });
    }
}
