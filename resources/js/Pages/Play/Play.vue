<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import { ref, reactive, computed } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Navbar from '@/Components/Navbar.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Game from '@/Chess/Game';

const page = usePage()
const user = computed(() => page.props.auth.user)



const skillLevels = {
    'easy': 0,
    'medium': 8,
    'hard': 15,
    'expert': 20
};

const choosing_op = ref(false);

const game = ref(null);

const startGame = (options) => {
    console.log(options);

    const mode = options.mode === "pvp" ? false : true;
    const difficulty = skillLevels[options.difficulty];
    const timeLimit = options.timeLimit;

    console.log(difficulty);

    choosing_op.value = true;
    game.value = reactive(new Game(mode, difficulty, timeLimit));
};

const options = ref({
    mode: 'pvp',
    difficulty: 'medium',
    timeLimit: '10',
});

const times = ['1', '3', '5', '10', '30'];
</script>

<template>

    <Head title="Play" />

    <Navbar v-if="!choosing_op" :user="user" />

    <AuthenticatedLayout>

        <div class="relative flex items-center justify-center min-h-[85vh] px-4">
            <div v-if="!choosing_op"
                class="w-full max-w-sm bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

                <div class="p-8 pb-4 text-center">
                    <h2 class="text-2xl font-bold text-white">New Game</h2>
                    <p class="text-gray-500 text-sm mt-1">Pick your match settings</p>
                </div>

                <div class="p-8 pt-1 space-y-8">

                    <section>
                        <p class="text-xs font-semibold text-gray-400 mb-1">Game Mode</p>
                        <div class="flex gap-2">
                            <button @click="options.mode = 'pvp'"
                                :class="options.mode === 'pvp' ? 'bg-white/85 text-black' : 'bg-white/5 text-white border border-white/10'"
                                class="flex-1 rounded-xl text-sm font-medium transition-all">
                                vs Player
                            </button>
                            <button @click="options.mode = 'pvai'"
                                :class="options.mode === 'pvai' ? 'bg-white/85 text-black' : 'bg-white/5 text-white border border-white/10'"
                                class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all">
                                vs AI
                            </button>
                        </div>
                    </section>

                    <div v-if="options.mode === 'pvai'" class="space-y-1">
                        <p class="text-xs font-semibold text-gray-400">AI Difficulty</p>
                        <div class="flex flex-col gap-2">
                            <button v-for="level in Object.keys(skillLevels)" :key="level"
                                @click="options.difficulty = level.toLowerCase()"
                                class="py-1 rounded-lg text-xs border transition-all" :class="options.difficulty === level.toLowerCase()
                                    ? 'bg-white/85 !border-gray-500 text-black'
                                    : 'bg-white/5 border-white/5 text-white'">
                                {{ level }}
                            </button>
                        </div>
                    </div>

                    <section>
                        <p class="text-xs font-semibold text-gray-400 mb-1">Time Limit (minutes)</p>
                        <div
                            class="flex justify-between items-center bg-white/5 py-2 px-4 rounded-xl border border-white/10">
                            <button v-for="time in times" :key="time" @click="options.timeLimit = time"
                                :class="options.timeLimit === time ? 'text-white' : 'text-gray-600'"
                                class="text-lg font-bold transition-all px-2">
                                {{ time }}
                            </button>
                        </div>
                    </section>

                    <div class="flex justify-center ">
                        <PrimaryButton class="!w-full !text-base" @click="startGame(options)">
                            Start Match
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div v-if="choosing_op" class="flex justify-center w-max">
                <div class="grid grid-cols-8 w-[640px] h-[640px] relative">
                    <template v-for="(row, r) in game.board.grid" :key="'row-' + r">
                        <div v-for="(piece, c) in row" :key="`sq-${r}-${c}`" @click="game.handleSquareClick(r, c)"
                            :class="[
                                'square relative flex justify-center items-center w-[80px] h-[80px]',
                                (r + c) % 2 !== 0 ? 'bg-green-700' : 'bg-[#eeeed2]'
                            ]">
                            <img v-if="piece"
                                :src="`/assets/skins/ace_attourney/${piece.color}-${piece.constructor.name.toLowerCase()}.svg`"
                                class="piece absolute w-[90%] z-10 pointer-events-none" />
                            <div v-if="game.board.highlightedMoves.some(m => m[0] === r && m[1] === c)"
                                class="highlight pointer-events-none z-20">
                            </div>
                        </div>
                    </template>
                </div>
                <div v-if="game.state === 'PROMOTION_PENDING'" id="overlay"
                    class="flex justify-center items-center absolute h-full w-full bg-[#0000006d]">
                    <section id="promotionModal"
                        class="absolute flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-1 rounded-xl shadow-[0_0_10px_gray]">
                        <img @click="game.promote('Queen', game.currentPlayer)" id="Queen"
                            src="assets/skins/blue_suit/white-queen.svg" alt="" class="piece h-[100%] cursor-pointer">
                        <img @click="game.promote('Rook', game.currentPlayer)" id="Rook"
                            src="assets/skins/blue_suit/white-rook.svg" alt="" class="piece h-[100%] cursor-pointer">
                        <img @click="game.promote('Bishop', game.currentPlayer)" id="Bishop"
                            src="assets/skins/blue_suit/white-bishop.svg" alt="" class="piece h-[100%] cursor-pointer">
                        <img @click="game.promote('Knight', game.currentPlayer)" id="Knight"
                            src="assets/skins/blue_suit/white-knight.svg" alt="" class="piece h-[100%] cursor-pointer">
                    </section>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style>
/* This div needs to cover the square for the ::after to work */
.highlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* Make sure it doesn't block clicks */
}

/* Your original logic now has a 'house' to live in */
.highlight::after {
    content: '';
    position: absolute;
    width: 25%;
    height: 25%;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>