<?php

namespace Database\Seeders;

use App\Models\Puzzle;
use Illuminate\Database\Seeder;

class PuzzleSeeder extends Seeder
{
    public function run(): void
    {
        $puzzles = [
            // Puzzle 1
            [
                'positions'    => '4r1rk/5K1b/7R/R7/8/8/8/8 w - - 0 1',
                'solution'     => [[2, 7, 1, 7], [0, 7, 1, 7], [3, 0, 3, 7]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            // Puzzle 2
            [
                'positions'    => '6k1/8/6K1/8/8/3r4/4r3/5R1R w - - 0 1',
                'solution'     => [[7, 7, 0, 7], [0, 6, 0, 7], [7, 5, 0, 5]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            // Puzzle 3
            [
                'positions'    => '8/1r6/8/3R4/k7/p1K5/4r3/R7 w - - 0 1',
                'solution'     => [[7, 0, 5, 0], [4, 0, 5, 0], [3, 3, 3, 0]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            // Puzzle 4
            [
                'positions'    => '2rkr3/2ppp3/2n1n3/R2R4/8/8/3K4/8 w - - 0 1',
                'solution'     => [[3, 3, 1, 3], [0, 3, 1, 3], [3, 0, 3, 3]],
                'player_color' => 'white',
                'difficulty'   => 400,
            ],

            // Puzzle 5
            [
                'positions'    => '4rkr1/1R1R4/4bK2/8/8/8/8/8 w - - 0 1',
                'solution'     => [[1, 3, 1, 5], [2, 4, 1, 5], [1, 1, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 400,
            ],

            // Puzzle 6
            [
                'positions'    => '5K1k/6pp/7R/8/8/8/8/6R1 w - - 0 1',
                'solution'     => [[7, 6, 2, 6], [1, 6, 2, 7], [2, 6, 0, 6]],
                'player_color' => 'white',
                'difficulty'   => 800,
            ],

            // Puzzle 7
            [
                'positions'    => '2k5/1q4b1/3K4/8/7R/8/7R/8 w - - 0 1',
                'solution'     => [[4, 7, 0, 7], [1, 6, 0, 7], [6, 7, 0, 7]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            // Puzzle 8
            [
                'positions'    => '8/8/q5b1/7k/5Kp1/1R1R4/8/8 w - - 0 1',
                'solution'     => [[5, 3, 5, 7], [4, 6, 5, 7], [5, 1, 5, 7]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            // Puzzle 9
            [
                'positions'    => 'k7/3b4/1K6/8/8/5q2/2R1R3/8 w - - 0 1',
                'solution'     => [[6, 4, 0, 4], [1, 3, 0, 4], [6, 2, 0, 2]],
                'player_color' => 'white',
                'difficulty'   => 450,
            ],

            // Puzzle 10
            [
                'positions'    => '8/1R1R4/8/p7/k1K5/r5r1/8/8 w - - 0 1',
                'solution'     => [[1, 1, 4, 1], [3, 0, 4, 1], [1, 3, 1, 0]],
                'player_color' => 'white',
                'difficulty'   => 500,
            ],

            // Puzzle 22
            [
                'positions'    => '8/5p2/7p/5Kpk/4BB1p/7r/8/8 w - - 0 1',
                'solution'     => [[4, 4, 3, 3], [3, 6, 4, 5], [3, 3, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 1000,
            ],

            // Puzzle 23
            [
                'positions'    => '8/6N1/8/pp6/kp6/pp5K/2N5/8 w - - 0 1',
                'solution'     => [[1, 6, 2, 4], [5, 1, 6, 2], [2, 4, 3, 2]],
                'player_color' => 'white',
                'difficulty'   => 800,
            ],

            // Puzzle 24
            [
                'positions'    => '8/8/8/7N/8/8/1p5p/N3K2k w - - 0 1',
                'solution'     => [[7, 4, 6, 5], [6, 1, 7, 0], [3, 7, 5, 6]],
                'player_color' => 'white',
                'difficulty'   => 1200,
            ],

            // Puzzle 25
            [
                'positions'    => '4K3/8/8/4N1pr/4b1pk/4N1nr/8/8 w - - 0 1',
                'solution'     => [[5, 4, 6, 6], [4, 4, 6, 6], [3, 4, 2, 6]],
                'player_color' => 'white',
                'difficulty'   => 750,
            ],

            // Puzzle 26
            [
                'positions'    => 'k7/ppK5/2N5/3N4/8/8/7p/8 w - - 0 1',
                'solution'     => [[1, 2, 0, 2], [1, 1, 2, 2], [3, 3, 1, 2]],
                'player_color' => 'white',
                'difficulty'   => 1300,
            ],

            // Puzzle 27
            [
                'positions'    => '7k/4K1pp/6pn/6N1/6N1/8/8/8 w - - 0 1',
                'solution'     => [[1, 4, 0, 5], [2, 7, 4, 6], [3, 6, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 1100,
            ],

            // Puzzle 28
            [
                'positions'    => '8/8/7p/5K1k/7p/8/2pn1N2/3N4 w - - 0 1',
                'solution'     => [[6, 5, 5, 7], [6, 2, 7, 3], [5, 7, 4, 5]],
                'player_color' => 'white',
                'difficulty'   => 1200,
            ],

            // Puzzle 29
            [
                'positions'    => '7k/6pp/5P1P/8/8/8/1p3K2/8 w - - 0 1',
                'solution'     => [[2, 5, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 600,
            ],

            // Puzzle 31
            [
                'positions'    => 'k7/pn6/p1Pp4/4P3/8/8/8/6K1 w - - 0 1',
                'solution'     => [[2, 2, 1, 2]],
                'player_color' => 'white',
                'difficulty'   => 700,
            ],

            // Cristobal Henriquez Villagra vs Cristobal Torres, Santiago, 2019
            [
                'positions'    => '1rb5/1p2k2r/p5n1/2p1pp2/2B5/6P1/PPPB1PP1/2KR4 w - - 1 0',
                'solution'     => [[6, 3, 3, 6], [1, 4, 0, 4], [7, 3, 0, 3], []],
                'player_color' => 'white',
                'difficulty'   => 1600,
            ],

            // Alen Rakhimzhan vs Alibek Igambergenov, Alma-Ata, 2019
            [
                'positions'    => '8/ppprq2p/5Qpk/6N1/2P1B1P1/6P1/PP3P2/n6K w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [1, 4, 1, 5], [4, 6, 3, 6],[2,7,3,7],[4,4,5,5]],
                'player_color' => 'white',
                'difficulty'   => 1900,
            ],

            // Darcy Lima vs Nicolas Lopez Azambuja, Montevideo, 2019
            [
                'positions'    => 'r2k1bbr/pp6/nqp3p1/3p2N1/2PP1B2/1P4QB/P6P/R3R2K w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [0, 6, 1, 5], [5, 6, 3, 6], [0,5,1,4], [3,7,1,4]],
                'player_color' => 'white',
                'difficulty'   => 1750,
            ],

            // Jorden Van Foreest vs Alisher Suleymenov, Moscow, 2019
            [
                'positions'    => '5rk1/p5r1/4p1p1/1p1b1NQ1/2pP4/P6R/q1P2PP1/4R1K1 w - - 1 0',
                'solution'     => [[5, 7, 0, 7], [0, 6, 0, 7], [3, 6, 2, 7], [0,7,0,6], [2,7,1,6]],
                'player_color' => 'white',
                'difficulty'   => 1900,
            ],

            // Luis Engel vs Theo Stijve, Bad Ragaz, 2019
            [
                'positions'    => '4rk2/r4n2/B2R1RQ1/P1p5/8/2q4P/2P3PK/8 w - - 1 0',
                'solution'     => [[2, 6, 2, 7], [0, 5, 0, 6], [2, 5, 2, 6], [5,2,1,6], [2,7,1,6]],
                'player_color' => 'white',
                'difficulty'   => 2000,
            ],

            // Zdenko Kozul vs Ante Saric, Bjelovar, 2019
            [
                'positions'    => '7k/3N2qp/b7/2p1Q1N1/Pp4PK/5p1P/1P3P2/6r1 w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [0, 7, 0, 6], [3, 4, 0, 4], [1,6,0,5], [0,4,0,5]],
                'player_color' => 'white',
                'difficulty'   => 2000,
            ],

            // Erdenepurev Boldoo vs Novendra Priasmoro, Ulan Bator, 2019
            [
                'positions'    => '8/4Bpb1/4b2k/1p2P1pp/4Q3/1r1NK1PP/4BP2/6r1 w - - 1 0',
                'solution'     => [[1, 4, 3, 6], [2, 7, 3, 6], [4, 4, 4, 7], [3,6,3,5], [4,7,3,7]],
                'player_color' => 'white',
                'difficulty'   => 2000,
            ],

            // Krzysztof Jakubowski vs Miroslaw Lewicki, Chorzow, 2019
            [
                'positions'    => 'r1r1q2k/pp2BR1p/b3n1p1/P2BP3/2Pn4/8/3N1QPP/R5K1 w - - 1 0',
                'solution'     => [[6, 5, 2, 5], [0, 7, 0, 6], [2, 5, 1, 6], [2, 4, 1, 6], [1, 5, 0, 5]],
                'player_color' => 'white',
                'difficulty'   => 2500,
            ],

            // Tomas Polak vs Karol Motuz, Slovakia, 2019
            [
                'positions'    => 'r1bq1rk1/4bpn1/p1p1n3/1p1pPBP1/1P6/P1N1PN2/2Q2PP1/3RK2R w K - 1 0',
                'solution'     => [[3, 5, 1, 7], [0, 6, 0, 7], [1, 7, 0, 6], [0,7,0,6], [6,2,1,7]],
                'player_color' => 'white',
                'difficulty'   => 2200,
            ],

            // Martin Cerveny vs Tomas Vojta, Czech Republic, 2019
            [
                'positions'    => '1r2k3/5p1Q/1q2bR2/4P3/1p4PB/7P/1r1p4/2R2K2 w - - 1 0',
                'solution'     => [[1, 7, 0, 6], [0, 4, 1, 3], [2, 5, 1, 5]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Bartosz Nowicki vs Bartlomiej Heberla, Chorzow, 2019
            [
                'positions'    => '8/2r1kpN1/p3p1pp/1p2p1b1/4q1P1/4B2P/PPP2Q2/1K1R4 w - - 1 0',
                'solution'     => [[5, 4, 3, 2], [1, 2, 3, 2], [6, 5, 3, 2], [1, 4, 2, 5], [1, 6, 0, 4]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Fabiano Caruana vs Paul Ezra, San Francisco, 2019
            [
                'positions'    => 'r1n3k1/1p1b2P1/3Pqp2/1Pp1p3/2P5/2N5/2B1Q3/6RK w - - 1 0',
                'solution'     => [[6, 2, 1, 7]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Boris Grachev vs Ramil Faizrakhmanov, Sochi, 2019
            [
                'positions'    => '4rr1k/1pb1R2p/p4p2/2P3N1/1P4Q1/P7/1B1q1PPP/6K1 w - - 1 0',
                'solution'     => [[3, 6, 1, 5], [0, 5, 1, 5], [1, 4, 0, 4]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Ivan Saric vs Jurica Srbis, Mali Losinj, 2019
            [
                'positions'    => '8/2p5/2Pp2p1/6Pk/1r1bQ2P/8/5PK1/8 w - - 1 0',
                'solution'     => [[6, 6, 5, 7]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Anastasia Bodnaruk vs Mariya Muzychuk, Hengshui, 2019
            [
                'positions'    => 'r1b1k3/pp4pp/2n1p2b/2p1q1N1/8/1PP1B1P1/P2Q2BP/5RK1 w - - 1 0',
                'solution'     => [[6, 6, 2, 2], [1, 1, 2, 2], [7, 5, 0, 5]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Elisabeth Paehtz vs Antoaneta Stefanova, Hengshui, 2019
            [
                'positions'    => '5rrk/2n2p1p/3q1PpQ/p2pNnR1/2pP2N1/P1P3R1/5P1P/7K w - - 1 0',
                'solution'     => [[2, 7, 1, 7]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],

            // Anastasia Bodnaruk vs Nana Dzagnidze, Hengshui, 2019
            [
                'positions'    => '2r1q1k1/1p5p/pb2p1pB/3pP3/bP1P2P1/P2B1Q2/7P/5R1K w - - 1 0',
                'solution'     => [[5, 5, 2, 5], [0, 2, 1, 2], [2, 5, 0, 5]],
                'player_color' => 'white',
                'difficulty'   => 0,
            ],
        ];

        foreach ($puzzles as $puzzle) {
            Puzzle::create($puzzle);
        }
    }
}
