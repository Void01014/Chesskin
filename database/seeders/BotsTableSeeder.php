<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BotsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('bots')->insert([
            [
                'id' => 1,
                'difficulty' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'difficulty' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'difficulty' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'difficulty' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}