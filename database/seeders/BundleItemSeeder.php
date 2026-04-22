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
        ]);

        // --------------------
        // ITEMS
        // --------------------
        DB::table('items')->insert([
            // Classic Set (bundle 1)
            ['id'=>1,'name'=>'Classic King','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'king','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>2,'name'=>'Classic Queen','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'queen','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>3,'name'=>'Classic Rook','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'rook','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>4,'name'=>'Classic Bishop','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'bishop','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>5,'name'=>'Classic Knight','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'knight','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>6,'name'=>'Classic Pawn','type'=>'piece','price'=>200,'folder'=>'classic','slug'=>'pawn','bundle_id'=>1,'created_at'=>$now1,'updated_at'=>$now1],

            // Ace Attorney Set (bundle 2)
            ['id'=>7,'name'=>'Ace attourney King','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'king','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>8,'name'=>'Ace attourney Queen','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'queen','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>9,'name'=>'Ace attourney Rook','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'rook','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>10,'name'=>'Ace attourney Bishop','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'bishop','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>11,'name'=>'Ace attourney Knight','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'knight','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>12,'name'=>'Ace attourney Pawn','type'=>'piece','price'=>200,'folder'=>'ace_attourney','slug'=>'pawn','bundle_id'=>2,'created_at'=>$now1,'updated_at'=>$now1],

            // Boards (no bundle_id)
            ['id'=>13,'name'=>'Minimalist Board','type'=>'board','price'=>500,'folder'=>'boards','slug'=>'classic','bundle_id'=>null,'created_at'=>$now1,'updated_at'=>$now1],
            ['id'=>14,'name'=>'Retro Board','type'=>'board','price'=>1000,'folder'=>'boards','slug'=>'retro','bundle_id'=>null,'created_at'=>$now2,'updated_at'=>$now2],
            ['id'=>15,'name'=>'Beach Board','type'=>'board','price'=>1500,'folder'=>'boards','slug'=>'beach','bundle_id'=>null,'created_at'=>$now2,'updated_at'=>$now2],
            ['id'=>16,'name'=>'Forest Board','type'=>'board','price'=>1500,'folder'=>'boards','slug'=>'forest','bundle_id'=>null,'created_at'=>$now2,'updated_at'=>$now2],
            ['id'=>17,'name'=>'Universe Board','type'=>'board','price'=>2000,'folder'=>'boards','slug'=>'universe','bundle_id'=>null,'created_at'=>$now2,'updated_at'=>$now2],

            // Extra pieces
            ['id'=>18,'name'=>'Cibernetic Pawn','type'=>'piece','price'=>600,'folder'=>'cibernetic','slug'=>'pawn','bundle_id'=>null,'created_at'=>$now2,'updated_at'=>$now2],
            ['id'=>19,'name'=>'Marble Pawn','type'=>'piece','price'=>700,'folder'=>'marble','slug'=>'pawn','bundle_id'=>null,'created_at'=>$now3,'updated_at'=>$now3],
        ]);
    }
}