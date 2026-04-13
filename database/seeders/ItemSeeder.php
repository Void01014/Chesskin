<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Bundle;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            'classic' => 'Classic Set',
            'ace_attourney' => 'Ace Attorney Set'
        ];

        $pieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];

        foreach ($themes as $folder => $themeName) {
            // 1. Create the Bundle (The "Set")
            $bundle = Bundle::create([
                'name' => $themeName,
                'price' => 1000, // Price for the whole set
            ]);

            $bundleItems = [];

            // 2. Create the individual pieces
            foreach ($pieces as $piece) {
                $item = Item::create([
                    'name' => ucfirst($folder) . ' ' . ucfirst($piece),
                    'type' => 'piece',
                    'price' => 200, // Price if bought individually
                    'folder' => $folder,
                    'slug' => $piece,
                    'is_in_bundle' => false,
                ]);

                $bundleItems[] = $item->id;
            }

            // 3. Link pieces to the bundle
            $bundle->items()->attach($bundleItems);
        }

        // 4. Add a default board
        Item::create([
            'name' => 'Minimalist Board',
            'type' => 'board',
            'price' => 500,
            'folder' => 'boards',
            'slug' => 'classic-board',
            'is_in_bundle' => false,
        ]);
    }
}