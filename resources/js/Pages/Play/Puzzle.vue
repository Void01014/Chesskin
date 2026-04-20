<script setup>
import { Head, usePage, router } from '@inertiajs/vue3';
import { ref, computed, reactive, watch } from 'vue'; // Added watch
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Navbar from '@/Components/Navbar.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Game from '@/Chess/Game';
import ChessBoard from '@/Components/ChessBoard.vue';
import axios from 'axios'; // For saving progress

const props = defineProps({
    puzzles: Array,
    solvedPuzzleIds: Array
});

const page = usePage();
const user = computed(() => page.props.auth.user);

const activePuzzle = ref(null);
const isFading = ref(false);
const puzzle_data = ref({
    level: 0,
    difficulty: 0
});

const timer = ref(0);

// Logic to determine if a level is solved, playable, or locked
const getPuzzleStatus = (id) => {
    if (props.solvedPuzzleIds.includes(id)) return 'solved';
    const firstUnsolved = props.puzzles.find(p => !props.solvedPuzzleIds.includes(p.id));
    if (firstUnsolved && firstUnsolved.id === id) return 'current';
    return 'locked';
};

const startPuzzle = (puzzle, level) => {
    const status = getPuzzleStatus(puzzle.id);
    if (status === 'locked') return;

    isFading.value = true;
    puzzle_data.value.level = level + 1;
    puzzle_data.value.difficulty = puzzle.difficulty;

    activePuzzle.value = reactive(new Game(
        'pvai',
        'medium',
        null,
        true,
        puzzle.positions,
        puzzle.solution
    ));

    const intervalId = setInterval(() => {
        timer.value++;
        console.log(`Elapsed time: ${timer.value} seconds`);
    }, 1000);

};

watch(() => activePuzzle.value?.puzzleCompleted, (completed) => {
    if (completed) {
        router.post(route('puzzles.complete', { puzzle: props.puzzles.find(p => p.id).id }), {
            solve_time: "00:00:00",
        }, {
            preserveScroll: true,
            onSuccess: () => console.log("Progress saved to database")
        });
    }
});

</script>

<template>

    <Head title="Puzzles" />
    <Navbar :user="user" />

    <AuthenticatedLayout>
        <div v-if="isFading"
            class="fixed inset-0 bg-black z-50 transition-opacity duration-1000 flex items-center justify-center"
            :class="activePuzzle ? 'opacity-100' : 'opacity-0'">
            <div v-if="activePuzzle" class="text-white text-2xl animate-pulse font-bold tracking-widest">
                LOADING POSITION...
            </div>
        </div>

        <div v-if="!activePuzzle" class="max-w-6xl mt-20 mx-auto px-4 py-8">
            <h2 class="text-4xl font-bold text-white mb-8">Tactics Trainer</h2>

            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div v-for="(puzzle, index) in puzzles" :key="puzzle.id" @click="startPuzzle(puzzle, index)"
                    class="relative aspect-square rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group"
                    :class="[
                        getPuzzleStatus(puzzle.id) === 'solved' ? 'bg-green-500/10 border-green-500/30 hover:border-green-500/50' :
                            getPuzzleStatus(puzzle.id) === 'current' ? 'bg-blue-600 border-blue-400 scale-105 shadow-lg shadow-blue-500/20' :
                                'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    ]">

                    <span class="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-tighter text-white/50">
                        Level {{ index + 1 }}
                    </span>

                    <div class="mb-2">
                        <svg v-if="getPuzzleStatus(puzzle.id) === 'locked'" class="w-8 h-8 text-white/20"
                            fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9h-1V6a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2m-6-8a3 3 0 0 1 3 3v2H9V5a3 3 0 0 1 3-3Z" />
                        </svg>
                        <svg v-else-if="getPuzzleStatus(puzzle.id) === 'solved'" class="w-8 h-8 text-green-400"
                            fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span v-else
                            class="text-3xl font-black text-white group-hover:scale-110 transition-transform">PLAY</span>
                    </div>

                    <span class="text-xs font-bold text-white/70">{{ puzzle.difficulty }} Elo</span>
                </div>
            </div>
        </div>

        <div v-else class="fixed inset-0 bg-zinc-950 z-50 p-8 flex items-center justify-center gap-12">

            <div class="shadow-2xl shadow-black/50 border-8 border-white/5 rounded-lg overflow-hidden">
                <ChessBoard :game="activePuzzle" skin="ace_attourney" />
            </div>

            <div class="w-96 text-white flex flex-col h-[640px] justify-between py-4">
                <div>
                    <h2 class="text-4xl font-black mb-2 uppercase tracking-tight">Level {{ puzzle_data.level }}</h2>
                    <p class="text-gray-400 font-mono text-sm mb-8">Difficulty: {{ puzzle_data.difficulty }}</p>

                    <div class="space-y-4">
                        <div v-if="activePuzzle.puzzleFailed"
                            class="bg-red-500/20 border border-red-500/50 p-4 rounded-xl text-red-200 animate-bounce">
                            <p class="font-bold">Wrong Move!</p>
                            <p class="text-xs">That isn't the solution. Try a different line.</p>
                        </div>

                        <div v-if="activePuzzle.puzzleCompleted"
                            class="bg-green-500/20 border border-green-500/50 p-4 rounded-xl text-green-200">
                            <p class="font-bold">Brilliant!</p>
                            <p class="text-xs">You've mastered this position.</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <PrimaryButton @click="activePuzzle = null; isFading = false"
                        class="w-full !justify-center !py-4 !rounded-2xl opacity-70 hover:opacity-100 transition-opacity">
                        Quit Puzzle
                    </PrimaryButton>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>