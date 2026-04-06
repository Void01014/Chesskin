<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>

    <Head title="Chess Game" />

    <AuthenticatedLayout>
        <main class="flex h-[80vh] justify-center items-center relative">
            <div id="board" class="relative">
            </div>

            <div v-if="showingPromotion"
                class="flex justify-center items-center absolute h-full w-full bg-[#0000006d] z-50">
                <section id="promotionModal"
                    class="flex items-center justify-center bg-white gap-2 h-[100px] w-[440px] p-1 rounded-xl shadow-[0_0_10px_gray]">
                    <img @click="selectPromotion('Queen')" src="/assets/skins/blue_suit/white-queen.svg"
                        class="piece h-full cursor-pointer hover:bg-gray-100">
                    <img @click="selectPromotion('Rook')" src="/assets/skins/blue_suit/white-rook.svg"
                        class="piece h-full cursor-pointer hover:bg-gray-100">
                    <img @click="selectPromotion('Bishop')" src="/assets/skins/blue_suit/white-bishop.svg"
                        class="piece h-full cursor-pointer hover:bg-gray-100">
                    <img @click="selectPromotion('Knight')" src="/assets/skins/blue_suit/white-knight.svg"
                        class="piece h-full cursor-pointer hover:bg-gray-100">
                </section>
            </div>
        </main>
    </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, reactive, onMounted } from 'vue';
import Game from '@/Chess/Game'; // Make sure Game.js is in resources/js/Chess/

// This keeps your logic alive!
const game = reactive(new Game());
const showingPromotion = ref(false);

const selectPromotion = (choice) => {
    // This replaces your manual event listeners
    game.handlePromotionChoice(choice);
    showingPromotion.value = false;
};
</script>