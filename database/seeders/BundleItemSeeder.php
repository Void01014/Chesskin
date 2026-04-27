<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BundleItemSeeder extends Seeder
{
    public function run(): void
    {
        $now1 = Carbon::parse('2026-04-15 13:28:26');
        $now2 = Carbon::parse('2026-04-16 14:42:58');
        $now3 = Carbon::parse('2026-04-17 15:42:58');

        // --------------------
        // BUNDLES
        // --------------------
        DB::table('bundles')->insert([
            [
                'id' => 1,
                'name' => 'Classic Set',
                'price' => 1000,
                'description' => 'Complete collection of the Classic Set pieces',
                'created_at' => $now1,
                'updated_at' => $now1,
            ],
            [
                'id' => 2,
                'name' => 'Ace Attorney Set',
                'price' => 1000,
                'description' => 'Complete collection of the Ace Attorney Set pieces',
                'created_at' => $now1,
                'updated_at' => $now1,
            ],
            [
                'id' => 3,
                'name' => 'Chesskin Set',
                'price' => 5000,
                'description' => 'Complete collection of the Chesskin Set pieces',
                'created_at' => $now3,
                'updated_at' => $now3,
            ],
        ]);

        // --------------------
        // ITEMS
        // --------------------
        DB::table('items')->insert([
            // Classic Set (bundle 1)
            ['id' => 1, 'name' => 'Classic King', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'king', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 2, 'name' => 'Classic Queen', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'queen', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 3, 'name' => 'Classic Rook', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'rook', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 4, 'name' => 'Classic Bishop', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'bishop', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 5, 'name' => 'Classic Knight', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'knight', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 6, 'name' => 'Classic Pawn', 'type' => 'piece', 'price' => 200, 'folder' => 'classic', 'slug' => 'pawn', 'bundle_id' => 1, 'created_at' => $now1, 'updated_at' => $now1],

            // Ace Attorney Set (bundle 2)
            ['id' => 7, 'name' => 'Ace Attorney King', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'king', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 8, 'name' => 'Ace Attorney Queen', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'queen', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 9, 'name' => 'Ace Attorney Rook', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'rook', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 10, 'name' => 'Ace Attorney Bishop', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'bishop', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 11, 'name' => 'Ace Attorney Knight', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'knight', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 12, 'name' => 'Ace Attorney Pawn', 'type' => 'piece', 'price' => 200, 'folder' => 'ace_attorney', 'slug' => 'pawn', 'bundle_id' => 2, 'created_at' => $now1, 'updated_at' => $now1],

            // Boards (no bundle_id)
            ['id' => 13, 'name' => 'Minimalist Board', 'type' => 'board', 'price' => 500, 'folder' => 'boards', 'slug' => 'classic', 'bundle_id' => null, 'created_at' => $now1, 'updated_at' => $now1],
            ['id' => 14, 'name' => 'Retro Board', 'type' => 'board', 'price' => 1000, 'folder' => 'boards', 'slug' => 'retro', 'bundle_id' => null, 'created_at' => $now2, 'updated_at' => $now2],
            ['id' => 15, 'name' => 'Beach Board', 'type' => 'board', 'price' => 1500, 'folder' => 'boards', 'slug' => 'beach', 'bundle_id' => null, 'created_at' => $now2, 'updated_at' => $now2],
            ['id' => 16, 'name' => 'Forest Board', 'type' => 'board', 'price' => 1500, 'folder' => 'boards', 'slug' => 'forest', 'bundle_id' => null, 'created_at' => $now2, 'updated_at' => $now2],
            ['id' => 17, 'name' => 'Universe Board', 'type' => 'board', 'price' => 2000, 'folder' => 'boards', 'slug' => 'universe', 'bundle_id' => null, 'created_at' => $now2, 'updated_at' => $now2],

            // Extra pieces
            ['id' => 18, 'name' => 'Cibernetic Pawn', 'type' => 'piece', 'price' => 600, 'folder' => 'cibernetic', 'slug' => 'pawn', 'bundle_id' => null, 'created_at' => $now2, 'updated_at' => $now2],
            ['id' => 19, 'name' => 'Marble Pawn', 'type' => 'piece', 'price' => 700, 'folder' => 'marble', 'slug' => 'pawn', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 22, 'name' => 'Marble Bishop', 'type' => 'piece', 'price' => 800, 'folder' => 'marble', 'slug' => 'bishop', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 23, 'name' => 'Marble Queen', 'type' => 'piece', 'price' => 900, 'folder' => 'marble', 'slug' => 'queen', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 24, 'name' => 'Marble Rook', 'type' => 'piece', 'price' => 800, 'folder' => 'marble', 'slug' => 'rook', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],


            // Adventure Time
            ['id' => 20, 'name' => 'Adventure Time Pawn', 'type' => 'piece', 'price' => 700, 'folder' => 'adventure_time', 'slug' => 'pawn', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],

            // Breaking Bad
            ['id' => 21, 'name' => 'Breaking Bad Pawn', 'type' => 'piece', 'price' => 700, 'folder' => 'breaking_bad', 'slug' => 'pawn', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],

            // Naruto
            ['id' => 25, 'name' => 'Naruto Bishop', 'type' => 'piece', 'price' => 2000, 'folder' => 'naruto', 'slug' => 'bishop', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 26, 'name' => 'Sasuke Queen', 'type' => 'piece', 'price' => 2000, 'folder' => 'naruto', 'slug' => 'queen', 'bundle_id' => null, 'created_at' => $now3, 'updated_at' => $now3],

            // Chesskin full set
            ['id' => 27, 'name' => 'Chesskin King', 'type' => 'piece', 'price' => 1000, 'folder' => 'chesskin', 'slug' => 'king', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 28, 'name' => 'Chesskin Queen', 'type' => 'piece', 'price' => 1000, 'folder' => 'chesskin', 'slug' => 'queen', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 29, 'name' => 'Chesskin Rook', 'type' => 'piece', 'price' => 900, 'folder' => 'chesskin', 'slug' => 'rook', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 30, 'name' => 'Chesskin Bishop', 'type' => 'piece', 'price' => 900, 'folder' => 'chesskin', 'slug' => 'bishop', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 31, 'name' => 'Chesskin Knight', 'type' => 'piece', 'price' => 900, 'folder' => 'chesskin', 'slug' => 'knight', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
            ['id' => 32, 'name' => 'Chesskin Pawn', 'type' => 'piece', 'price' => 800, 'folder' => 'chesskin', 'slug' => 'pawn', 'bundle_id' => 3, 'created_at' => $now3, 'updated_at' => $now3],
        ]);
    }
}
