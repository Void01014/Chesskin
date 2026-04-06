<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, reactive, onMounted } from 'vue';
import Game from '@/Chess/Game'; // Make sure Game.js is in resources/js/Chess/

// This keeps your logic alive!
const game = reactive(new Game());

</script>

<template>
    <main class="flex justify-center items-center h-screen w-full">
        <div class="grid grid-cols-8 w-[640px] h-[640px] relative">
            <template v-for="(row, r) in game.board.grid" :key="'row-' + r">
                <div v-for="(piece, c) in row" :key="`sq-${r}-${c}`" @click="game.handleSquareClick(r, c)" :class="[
                    'square relative flex justify-center items-center w-[80px] h-[80px]',
                    (r + c) % 2 !== 0 ? 'bg-green-700' : 'bg-[#eeeed2]'
                ]">
                    <img v-if="piece"
                        :src="`/assets/skins/blue_suit/${piece.color}-${piece.constructor.name.toLowerCase()}.svg`"
                        class="piece absolute w-[90%] z-10 pointer-events-none" />
                    <div v-if="game.board.highlightedMoves.some(m => m[0] === r && m[1] === c)"
                        class="highlight pointer-events-none z-20">
                    </div>
                </div>
            </template>
        </div>
        <div v-if="game.state === 'PROMOTION_PENDING'" id="overlay" class="flex justify-center items-center absolute h-full w-full bg-[#0000006d]">
            <section id="promotionModal"
                class="absolute flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-1 rounded-xl shadow-[0_0_10px_gray]">
                <img @click="game.promote('Queen', game.currentPlayer)" id="Queen" src="assets/skins/blue_suit/white-queen.svg" alt=""
                    class="piece h-[100%] cursor-pointer">
                <img @click="game.promote('Rook', game.currentPlayer)" id="Rook" src="assets/skins/blue_suit/white-rook.svg" alt="" class="piece h-[100%] cursor-pointer">
                <img @click="game.promote('Bishop', game.currentPlayer)" id="Bishop" src="assets/skins/blue_suit/white-bishop.svg" alt=""
                    class="piece h-[100%] cursor-pointer">
                <img @click="game.promote('Knight', game.currentPlayer)" id="Knight" src="assets/skins/blue_suit/white-knight.svg" alt=""
                    class="piece h-[100%] cursor-pointer">
            </section>
        </div>

    </main>
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