<script setup>
import { computed } from 'vue';

const props = defineProps({
    game: {
        type: Object,
        required: true
    },
    // Allows overriding the skin folder (e.g., 'classic', 'ace_attourney')
    skin: {
        type: String,
        default: 'ace_attourney'
    }
});

// Helper for promotion pieces logic
const promotionPieces = ['Queen', 'Rook', 'Bishop', 'Knight'];
</script>

<template>
    <div class="relative inline-block select-none w-full">
        <div class="board-wrapper grid grid-cols-8 w-full aspect-square relative rounded-sm">
            <template v-for="(row, r) in game.board.grid" :key="'row-' + r">
                <div v-for="(piece, c) in row" :key="`sq-${r}-${c}`" @click="game.handleSquareClick(r, c)" :class="[
                    'square relative flex justify-center items-center aspect-square w-full cursor-pointer'
                ]">
                    <img v-if="piece"
                        :src="`/assets/skins/${skin}/${piece.color}-${piece.constructor.name.toLowerCase()}.svg`"
                        class="piece absolute w-[90%] z-10 pointer-events-none transition-transform duration-200" />

                    <div v-if="game.board.highlightedMoves.some(m => m[0] === r && m[1] === c)"
                        class="highlight pointer-events-none z-20">
                    </div>
                </div>
            </template>
        </div>

        <div v-if="game.state === 'PROMOTION_PENDING'"
            class="flex justify-center items-center absolute inset-0 z-50 bg-black/40 backdrop-blur-[2px] rounded-sm">
            <section
                class="flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-2 rounded-2xl shadow-2xl border-4 border-black/10">

                <div v-for="type in promotionPieces" :key="type" class="h-full">
                    <img @click="game.promote(type, game.currentPlayer)"
                        :src="`/assets/skins/${skin}/${game.currentPlayer}-${type.toLowerCase()}.svg`"
                        class="h-full aspect-square cursor-pointer hover:bg-black/5 hover:scale-110 transition-all p-1 rounded-lg" />
                </div>
            </section>
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