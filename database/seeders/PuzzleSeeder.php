<?php

namespace Database\Seeders;

use App\Models\Puzzle;
use Illuminate\Database\Seeder;

class PuzzleSeeder extends Seeder
{
    public function run(): void
    {
        $puzzles = [
            // 1. Back Rank Mate (Easy)
            [
                'positions' => '6k1/5ppp/8/8/8/8/5PPP/4RK2 w - - 0 1',
                'solution' => [[7, 4, 0, 4]], // Re1 to e8#
                'player_color' => 'white',
                'difficulty' => 400,
            ],
            // 2. Scholar's Mate Style Punish
            [
                'positions' => 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
                'solution' => [[2, 5, 1, 5]], // Qf3 to f7#
                'player_color' => 'white',
                'difficulty' => 500,
            ],
            // 3. Simple Fork (Knight)
            [
                'positions' => 'r3k2r/pp3ppp/2n5/8/4n3/5N2/PPP2PPP/R1B1K2R w KQkq - 0 1',
                'solution' => [[5, 5, 3, 4]], // Nf3 to e5+ (Forking King and Rook/Knight)
                'player_color' => 'white',
                'difficulty' => 650,
            ],
            // 4. Hanging Queen
            [
                'positions' => 'r1b1k2r/ppp2ppp/2n5/3qp3/8/3P1N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
                'solution' => [[5, 5, 3, 4]], // Nf3 to e5 (Attacking Queen)
                'player_color' => 'white',
                'difficulty' => 800,
            ],
            // 5. Smothered Mate Pattern
            [
                'positions' => '6rk/5Npp/8/8/8/8/8/7K b - - 0 1',
                'solution' => [[1, 5, 0, 7]], // Nf7# (Technically black is mated here)
                'player_color' => 'white',
                'difficulty' => 950,
            ],
            // 6. Discovery Attack
            [
                'positions' => 'r1b1k2r/ppp2ppp/2n5/2bpP3/3N4/2P1B3/PP3PPP/RN1QKB1R b KQkq - 0 1',
                'solution' => [[4, 3, 3, 3]], // d4xd5+ (Discovered attack on Queen)
                'player_color' => 'black',
                'difficulty' => 1100,
            ],
            // 7. Anastasia's Mate
            [
                'positions' => '5rk1/5ppp/8/8/8/8/5PPP/R3R1K1 w - - 0 1',
                'solution' => [[7, 0, 0, 0]], // Ra1 to a8#
                'player_color' => 'white',
                'difficulty' => 1250,
            ],
            // 8. Pinning the Piece
            [
                'positions' => '4r1k1/5ppp/8/8/3q4/8/5PPP/4R1K1 w - - 0 1',
                'solution' => [[7, 4, 0, 4]], // Re1 to e8# (Queen is pinned or removed)
                'player_color' => 'white',
                'difficulty' => 1400,
            ],
            // 9. Greek Gift Sacrifice
            [
                'positions' => 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/P1NBPN2/1P3PPP/R1BQK2R w KQ - 0 1',
                'solution' => [[3, 5, 1, 7]], // Bxh7+
                'player_color' => 'white',
                'difficulty' => 1550,
            ],
            // 10. Intermediate Move (Zwischenzug)
            [
                'positions' => 'r1bqk2r/ppp2ppp/2n5/3pP3/3P4/5N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
                'solution' => [[3, 4, 2, 4]], // e5 to e6!
                'player_color' => 'white',
                'difficulty' => 1700,
            ],
            // 11. Endgame Skewer
            [
                'positions' => '8/8/8/8/8/1k6/7R/K7 w - - 0 1',
                'solution' => [[6, 7, 6, 0]], // Rh2 to h1... then Rh8 to win rook
                'player_color' => 'white',
                'difficulty' => 1850,
            ],
            // 12. Deflection
            [
                'positions' => '6k1/5ppp/8/8/3q4/8/Q4PPP/6K1 w - - 0 1',
                'solution' => [[6, 0, 0, 0]], // Qa2 to a8+ (forcing Queen to deflect)
                'player_color' => 'white',
                'difficulty' => 2000,
            ],
            // 13. Windmill Tactic (Simplified)
            [
                'positions' => 'r1b2rk1/pp3ppp/8/1B1p4/8/8/PP3PPP/R1B1R1K1 w - - 0 1',
                'solution' => [[3, 1, 0, 4]], // Bb5 to e8 (forcing capture)
                'player_color' => 'white',
                'difficulty' => 2200,
            ],
            // 14. Double Check
            [
                'positions' => 'r1bqk2r/ppp2Npp/2n5/3pp3/2B1n3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
                'solution' => [[1, 5, 0, 3]], // Nf7 to d8+ (Double check)
                'player_color' => 'white',
                'difficulty' => 2400,
            ],
            // 15. Complex Mate in 2 (The Finale)
            [
                'positions' => 'r1b2rk1/ppp2ppp/8/8/2B5/5Q2/PPP2PPP/R3R1K1 w - - 0 1',
                'solution' => [[2, 5, 1, 5], [1, 5, 0, 6]], // Qxf7+ then Rxf7
                'player_color' => 'white',
                'difficulty' => 2600,
            ],
        ];

        foreach ($puzzles as $puzzle) {
            Puzzle::create($puzzle);
        }
    }
}