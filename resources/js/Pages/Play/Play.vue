<script setup>
import Swal from 'sweetalert2';
import { Head, usePage, router } from '@inertiajs/vue3';
import { ref, reactive, computed } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Navbar from '@/Components/Navbar.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Game from '@/Chess/Game';
import ChessBoard from '@/Components/ChessBoard.vue';
import GameOver from '@/Components/GameOver.vue';


const page = usePage()
const user = computed(() => page.props.auth.user)

const props = defineProps({
    bots: Array,
    equipped_pieces: Array,
    equipped_board: Object,
    random_bundle: Array
})

const emit = defineEmits(['rematch', 'close']);


const nexusSwal = Swal.mixin({
    background: '#18181b',
    color: '#ffffff',
    buttonsStyling: false,
    customClass: {
        popup: 'border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm',
        title: 'text-3xl font-black italic tracking-tighter uppercase',
        htmlContainer: 'text-zinc-500 text-xs uppercase tracking-widest mt-2',
        confirmButton: 'px-10 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors rounded-lg mx-2',
        cancelButton: 'px-10 py-3 bg-transparent text-white/50 border border-white/5 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all rounded-lg mx-2',
        actions: 'mt-8'
    },
    showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster'
    }
});



const skillLevels = {
    0: 'easy',
    8: 'medium',
    15: 'hard',
    20: 'expert'
};

const rematchKey = ref(0);
const choosing_op = ref(true);

const game = ref(null);

const startGame = async (options, game_ended) => {
    if (game.value && !game_ended) {
        const result = await nexusSwal.fire({
            title: 'Restart Game?',
            text: 'Current game data will be lost',
            showCancelButton: true,
            confirmButtonText: 'Restart',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            const mode = options.mode === "pvp" ? false : true;
            const bot_id = options.bot.id;
            const difficulty = options.bot.difficulty;

            const timeLimit = options.timeLimit;

            choosing_op.value = false;
            game.value = reactive(new Game(mode, difficulty, timeLimit, bot_id, false, null, null));
        }


    } else {
        const mode = options.mode === "pvp" ? false : true;
        const bot_id = options.bot.id;
        const difficulty = options.bot.difficulty;

        const timeLimit = options.timeLimit;

        choosing_op.value = false;
        game.value = reactive(new Game(mode, difficulty, timeLimit, bot_id, false, null, null));
    }

    if (game.value.isAiGame && game.value.humanColor !== game.value.currentPlayer) {
        setTimeout(() => {
            game.value.getAIMove();
            game.value.board.grid = [...game.value.board.grid];
        }, 250);
    }
    rematchKey.value++;
    console.log(rematchKey.value);

};

const stopGame = async (game_ended) => {
    if (!game_ended) {
        const result = await nexusSwal.fire({
            title: 'Stop Game?',
            text: 'Your progress will be lost',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            game.value = null
            choosing_op.value = true
        }
    } else {
        game.value = null
        choosing_op.value = true
    }

}

const options = ref({
    mode: 'pvp',
    bot: {
        id: 2,
        difficulty: 8
    },
    timeLimit: '10',
});

const times = ['1', '3', '5', '10', '30'];

const storeGame = (game) => {
    const mode = game.isAiGame ? 'pvai' : 'pvp';

    router.post('storeGame', {
        mode: mode,
        bot_id: game.bot_id,
        player_color: game.humanColor,
        winner: game.winner,
        moves: game.history
    })
}

</script>

<template>

    <Head title="Play" />

    <Navbar v-if="choosing_op" :user="user" />

    <AuthenticatedLayout class="flex justify-center bg-black">

        <div class="relative flex items-center justify-center h-[85vh] aspect-square px-4">
            <div v-if="choosing_op"
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
                            <button v-for="bot in props.bots" :key="bot.id"
                                @click="options.bot.id = bot.id; options.bot.difficulty = bot.difficulty"
                                class="py-1 rounded-lg text-xs border transition-all" :class="options.bot.difficulty === bot.difficulty
                                    ? 'bg-white/85 !border-gray-500 text-black'
                                    : 'bg-white/5 border-white/5 text-white'">
                                {{ skillLevels[bot.difficulty] }}
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
                        <PrimaryButton class="!w-full !text-base"
                            @click="startGame(options, game?.state === 'GAME_OVER')">
                            Start Match
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div v-if="!choosing_op"
                class="flex flex-col sm:flex-row items-center sm:h-full w-[85vw] sm:w-[115vh] gap-4 ">
                <div class="flex justify-center w-full">
                    <ChessBoard :game="game" :equipped_pieces=equipped_pieces :equipped_board=equipped_board
                        :random_bundle=random_bundle @game-ended="storeGame(game)"
                        :rematch-key="rematchKey" @rematch="startGame(options, game?.state === 'GAME_OVER')"
                        @close="stopGame(game?.state === 'GAME_OVER')">
                    </ChessBoard>
                </div>
                <div class="flex items-end sm:h-full gap-3">
                    <PrimaryButton @click="startGame(options, game?.state === 'GAME_OVER')" class="h-5">Restart
                    </PrimaryButton>
                    <PrimaryButton @click="stopGame(game?.state === 'GAME_OVER')" class="h-5">stop</PrimaryButton>
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

/* Ensure Swal actions don't use default flex behavior */
.swal2-actions {
    display: flex !important;
    justify-content: center !important;
    width: 100% !important;
}

/* Custom backdrop to match your Game Over modal */
.swal2-backdrop-show {
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.6) !important;
}
</style>