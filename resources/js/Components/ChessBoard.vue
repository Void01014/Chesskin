<script setup>
import { ref } from 'vue';
import GameOverModal from '@/Components/GameOver.vue';


const props = defineProps({
    game: {
        type: Object,
        required: true
    },
    equipped_pieces: Array,
    equipped_board: Object,
    random_bundle: Array,
});

const mapped_pieces = {};
const mapped_random_pieces = {};

const gameKey = ref(0);

props.equipped_pieces.forEach((equipment, index) => {
    mapped_pieces[equipment.item.slug] = equipment.item.folder;

    const randomPiece = props.random_bundle[index];
    if (randomPiece) {
        mapped_random_pieces[randomPiece.slug] = randomPiece.folder;
    }
});


const emit = defineEmits(['rematch', 'close', 'game-ended']);

const handleRematch = () => {
    gameKey.value++;
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
        ]" :style="`background-image: url('/assets/skins/boards/${props.equipped_board.slug}.svg')`">
            <template v-for="(row, r) in game.board.grid" :key="'row-' + r">
                <div v-for="(piece, c) in row" :key="`sq-${r}-${c}`" @click="game.handleSquareClick(r, c)"
                    class="square relative flex justify-center items-center aspect-square w-full cursor-pointer">

                    <img v-if="piece" :key="`${gameKey}-${r}-${c}-${piece.color}-${piece.constructor.name}`" :src="`/assets/skins/${piece.color === game.humanColor
                        ? mapped_pieces[piece.constructor.name.toLowerCase()]
                        : mapped_random_pieces[piece.constructor.name.toLowerCase()]
                        }/${piece.color}-${piece.constructor.name.toLowerCase()}.svg`" :class="[
                            'piece absolute pointer-events-none transition-transform duration-200',
                            'w-[90%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                            game.humanColor === 'black' ? 'rotate-180' : ''
                        ]" />
                    <div v-if="game.board.highlightedMoves.some(m => m[0] === r && m[1] === c)"
                        class="highlight pointer-events-none z-20">
                    </div>
                </div>
            </template>

            <div v-if="props.game?.state === 'PROMOTION_PENDING'" id="overlay" :class="['flex justify-center items-center absolute h-full w-full bg-[#0000006d] z-50',
                game.humanColor === 'black' ? 'rotate-180' : '']">

                <section id="promotionModal"
                    class="absolute flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-1 rounded-xl shadow-[0_0_10px_gray]">

                    <template v-for="type in ['queen', 'rook', 'bishop', 'knight']" :key="type">
                        <img :id="type" :src="`/assets/skins/${mapped_pieces[type]}/${game.humanColor}-${type}.svg`"
                            :alt="type" @click="game.promote(type, game.currentPlayer)"
                            class="piece h-[100%] cursor-pointer hover:bg-gray-100 rounded-lg transition-colors" />
                    </template>

                </section>
            </div>

            <GameOverModal :is-puzzle="game.ispuzzle" :game-state="game.state" :winner="game.winner"
                :player-color="game.humanColor" @close="handleClose" @rematch="handleRematch" @game-ended="gameEnded"
                :class="game.humanColor === 'black' ? 'rotate-180' : ''" />
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
    background-color: rgba(0, 0, 0, 0.557);
    border-radius: 50%;
    animation: pulse 1.8s ease-in-out infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.445);
    }

    50% {
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.584);
    }
}

.piece {
    transform-origin: center center;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.33));
}

.board-wrapper {
    padding: 0;
    margin: 0;
    position: relative;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.glow-blue {
    animation: glow-blue 3s ease-in-out infinite;
}

.glow-red {
    animation: glow-red 3s ease-in-out infinite;
}

@keyframes glow-blue {

    0%,
    100% {
        filter: drop-shadow(0 0 3px rgba(99, 179, 237, 0.3));
    }

    50% {
        filter: drop-shadow(0 0 8px rgba(32, 154, 241, 0.75));
    }
}

@keyframes glow-red {

    0%,
    100% {
        filter: drop-shadow(0 0 3px rgba(252, 129, 129, 0.3));
    }

    50% {
        filter: drop-shadow(0 0 8px rgba(247, 84, 84, 0.75));
    }
}
</style>