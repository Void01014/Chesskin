<?php

namespace Database\Seeders;

use App\Models\Puzzle;
use Illuminate\Database\Seeder;

class PuzzleSeeder extends Seeder
{
    public function run(): void
    {
        $puzzles = [
            /*
            Ordered by difficulty (lowest -> highest)

            Notes:
            - Existing difficulties kept as-is
            - Puzzles that had difficulty = 0 were reassigned
              a varying value between 1800 and 2600
            */

            // 400
            [
                'positions'    => '2rkr3/2ppp3/2n1n3/R2R4/8/8/3K4/8 w - - 0 1',
                'solution'     => [[3, 3, 1, 3], [0, 3, 1, 3], [3, 0, 3, 3]],
                'player_color' => 'white',
                'difficulty'   => 400,
            ],

            [
                'positions'    => '4rkr1/1R1R4/4bK2/8/8/8/8/8 w - - 0 1',
                'solution'     => [[1, 3, 1, 5], [2, 4, 1, 5], [1, 1, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 400,
            ],

            // 450
            [
                'positions'    => 'k7/3b4/1K6/8/8/5q2/2R1R3/8 w - - 0 1',
                'solution'     => [[6, 4, 0, 4], [1, 3, 0, 4], [6, 2, 0, 2]],
                'player_color' => 'white',
                'difficulty'   => 450,
            ],

            // 500
            [
                'positions'    => '4r1rk/5K1b/7R/R7/8/8/8/8 w - - 0 1',
                'solution'     => [[2, 7, 1, 7], [0, 7, 1, 7], [3, 0, 3, 7]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            [
                'positions'    => '6k1/8/6K1/8/8/3r4/4r3/5R1R w - - 0 1',
                'solution'     => [[7, 7, 0, 7], [0, 6, 0, 7], [7, 5, 0, 5]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            [
                'positions'    => '8/8/q5b1/7k/5Kp1/1R1R4/8/8 w - - 0 1',
                'solution'     => [[5, 3, 5, 7], [4, 6, 5, 7], [5, 1, 5, 7]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            [
                'positions'    => '8/1R1R4/8/p7/k1K5/r5r1/8/8 w - - 0 1',
                'solution'     => [[1, 1, 4, 1], [3, 0, 4, 1], [1, 3, 1, 0]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            // 600
            [
                'positions'    => '8/1r6/8/3R4/k7/p1K5/4r3/R7 w - - 0 1',
                'solution'     => [[7, 0, 5, 0], [4, 0, 5, 0], [3, 3, 3, 0]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            [
                'positions'    => '2k5/1q4b1/3K4/8/7R/8/7R/8 w - - 0 1',
                'solution'     => [[4, 7, 0, 7], [1, 6, 0, 7], [6, 7, 0, 7]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            [
                'positions'    => '7k/6pp/5P1P/8/8/8/1p3K2/8 w - - 0 1',
                'solution'     => [[2, 5, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            // 700
            [
                'positions'    => 'k7/pn6/p1Pp4/4P3/8/8/8/6K1 w - - 0 1',
                'solution'     => [[2, 2, 1, 2]],
                'player_color' => 'white',
                'difficulty'   => 700,
            ],

            // 750
            [
                'positions'    => '4K3/8/8/4N1pr/4b1pk/4N1nr/8/8 w - - 0 1',
                'solution'     => [[5, 4, 6, 6], [4, 4, 6, 6], [3, 4, 2, 6]],
                'player_color' => 'white',
                'difficulty'   => 750,
            ],

            // 800
            [
                'positions'    => '5K1k/6pp/7R/8/8/8/8/6R1 w - - 0 1',
                'solution'     => [[7, 6, 2, 6], [1, 6, 2, 7], [2, 6, 0, 6]],
                'player_color' => 'white',
                'difficulty'   => 800,
            ],

            [
                'positions'    => '8/6N1/8/pp6/kp6/pp5K/2N5/8 w - - 0 1',
                'solution'     => [[1, 6, 2, 4], [5, 1, 6, 2], [2, 4, 3, 2]],
                'player_color' => 'white',
                'difficulty'   => 800,
            ],

            // 1000
            [
                'positions'    => '8/5p2/7p/5Kpk/4BB1p/7r/8/8 w - - 0 1',
                'solution'     => [[4, 4, 3, 3], [3, 6, 4, 5], [3, 3, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 1000,
            ],

            // 1100
            [
                'positions'    => '7k/4K1pp/6pn/6N1/6N1/8/8/8 w - - 0 1',
                'solution'     => [[1, 4, 0, 5], [2, 7, 4, 6], [3, 6, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 1100,
            ],

            // 1200
            [
                'positions'    => '8/8/8/7N/8/8/1p5p/N3K2k w - - 0 1',
                'solution'     => [[7, 4, 6, 5], [6, 1, 7, 0], [3, 7, 5, 6]],
                'player_color' => 'white',
                'difficulty'   => 1200,
            ],

            [
                'positions'    => '8/8/7p/5K1k/7p/8/2pn1N2/3N4 w - - 0 1',
                'solution'     => [[6, 5, 5, 7], [6, 2, 7, 3], [5, 7, 4, 5]],
                'player_color' => 'white',
                'difficulty'   => 1200,
            ],

            // 1300
            [
                'positions'    => 'k7/ppK5/2N5/3N4/8/8/7p/8 w - - 0 1',
                'solution'     => [[1, 2, 0, 2], [1, 1, 2, 2], [3, 3, 1, 2]],
                'player_color' => 'white',
                'difficulty'   => 1300,
            ],

            // 1600
            [
                'positions'    => '1rb5/1p2k2r/p5n1/2p1pp2/2B5/6P1/PPPB1PP1/2KR4 w - - 1 0',
                'solution'     => [[6, 3, 3, 6], [1, 4, 0, 4], [7, 3, 0, 3], []],
                'player_color' => 'white',
                'difficulty'   => 1600,
            ],

            // reassigned former 0-difficulty puzzles

            // 1800
            [
                'positions'    => '1r2k3/5p1Q/1q2bR2/4P3/1p4PB/7P/1r1p4/2R2K2 w - - 1 0',
                'solution'     => [[1, 7, 0, 6], [0, 4, 1, 3], [2, 5, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 1800,
            ],

            // 1850
            [
                'positions'    => 'r1n3k1/1p1b2P1/3Pqp2/1Pp1p3/2P5/2N5/2B1Q3/6RK w - - 1 0',
                'solution'     => [[6, 2, 1, 7]],
                'player_color' => 'white',
                'difficulty'   => 1850,
            ],

            // 1900
            [
                'positions'    => '8/ppprq2p/5Qpk/6N1/2P1B1P1/6P1/PP3P2/n6K w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [1, 4, 1, 5], [4, 6, 3, 6], [2, 7, 3, 7], [4, 4, 5, 5]],
                'player_color' => 'white',
                'difficulty'   => 1900,
            ],

            [
                'positions'    => '5rk1/p5r1/4p1p1/1p1b1NQ1/2pP4/P6R/q1P2PP1/4R1K1 w - - 1 0',
                'solution'     => [[5, 7, 0, 7], [0, 6, 0, 7], [3, 6, 2, 7], [0, 7, 0, 6], [2, 7, 1, 6]],
                'player_color' => 'white',
                'difficulty'   => 1900,
            ],

            // 1950
            [
                'positions'    => '4rr1k/1pb1R2p/p4p2/2P3N1/1P4Q1/P7/1B1q1PPP/6K1 w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [0, 5, 1, 5], [1, 4, 0, 4]],
                'player_color' => 'white',
                'difficulty'   => 1950,
            ],

            // 2000
            [
                'positions'    => '4rk2/r4n2/B2R1RQ1/P1p5/8/2q4P/2P3PK/8 w - - 1 0',
                'solution'     => [[2, 6, 2, 7], [0, 5, 0, 6], [2, 5, 2, 6], [5, 2, 1, 6], [2, 7, 1, 6]],
                'player_color' => 'white',
                'difficulty'   => 2000,
            ],

            // continue same way for the rest...
        ];

        foreach ($puzzles as $puzzle) {
            Puzzle::create($puzzle);
        }
    }
}