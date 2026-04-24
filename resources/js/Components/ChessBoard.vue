<script setup>
import { router } from '@inertiajs/vue3';
import GameOverModal from '@/Components/GameOver.vue';


const props = defineProps({
    game: {
        type: Object,
        required: true
    },
    skin: {
        type: String,
        default: 'ace_attourney'
    }
});

const emit = defineEmits(['rematch', 'close', 'game-ended']);

const handleRematch = () => {
    emit('rematch');
};

const handleClose = () => {
    emit('close');
};

const gameEnded = () => {
    emit('game-ended');
};

</script>

<template>
    <div class="relative inline-block select-none w-full">
        <div :class="[
            'board-wrapper grid grid-cols-8 w-full aspect-square relative rounded-sm',
            game.humanColor === 'black' ? 'rotate-180' : ''
        ]">
            <template v-for="(row, r) in game.board.grid" :key="'row-' + r">
                <div v-for="(piece, c) in row" :key="`sq-${r}-${c}`" @click="game.handleSquareClick(r, c)"
                    class="square relative flex justify-center items-center aspect-square w-full cursor-pointer">

                    <img v-if="piece"
                        :src="`/assets/skins/${skin}/${piece.color}-${piece.constructor.name.toLowerCase()}.svg`"
                        :class="[
                            'piece absolute w-[90%] pointer-events-none transition-transform duration-200',
                            game.humanColor === 'black' ? 'rotate-180' : ''
                        ]" />

                    <div v-if="game.board.highlightedMoves.some(m => m[0] === r && m[1] === c)"
                        class="highlight pointer-events-none z-20">
                    </div>
                </div>
            </template>

            <div v-if="props.game?.state === 'PROMOTION_PENDING'" id="overlay"
                :class="['flex justify-center items-center absolute h-full w-full bg-[#0000006d]', game.humanColor === 'black' ? 'rotate-180' : '']">
                <section id="promotionModal"
                    class="absolute flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-1 rounded-xl shadow-[0_0_10px_gray]">
                </section>
            </div>

            <GameOverModal :is-puzzle="game.ispuzzle" :game-state="game.state" :winner="game.winner"
                :player-color="game.humanColor" @close="handleClose" @rematch="handleRematch" @game-ended="gameEnded" />
        </div>

    </div>

</template>

<style scoped>
.highlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.highlight::after {
    content: '';
    position: absolute;
    width: 25%;
    height: 25%;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.piece {
    /* Optional: filter to make pieces pop if board is dark */
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.33));
}

.board-wrapper {
    padding: 0;
    margin: 0;
    position: relative;
    background-image: url('/assets/skins/boards/retro.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>