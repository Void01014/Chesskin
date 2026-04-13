<script setup>
import { ref, computed } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

const search = ref('');

const shopItems = ref([
    {
        id: 1,
        name: 'Blue Suit Set',
        type: 'set',
        price: 1200,
        folder: 'blue_suit',
        pieces: ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']
    },
    {
        id: 2,
        name: 'Neo-Classic Knight',
        type: 'single',
        price: 250,
        folder: 'neo',
        piece: 'knight'
    },
    // Add more items here...
]);

const filteredItems = computed(() => {
    return shopItems.value.filter(item =>
        item.name.toLowerCase().includes(search.value.toLowerCase())
    );
});
</script>

<template>

    <Head title="Store" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mx-auto px-4 py-8">

            <div class="relative mb-12 max-w-md mx-auto">
                <input v-model="search" type="text" placeholder="Search skins..."
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-white/30 focus:ring-0 transition-all" />
            </div>

            <div class="space-y-12">
                <div v-for="item in filteredItems" :key="item.id">

                    <div v-if="item.type === 'set'" class="group">
                        <div class="flex justify-between items-end mb-4 px-2">
                            <div>
                                <h3 class="text-xl font-bold text-white">{{ item.name }}</h3>
                                <span class="text-[10px] text-gray-500 uppercase tracking-widest">Full Collection</span>
                            </div>
                            <div class="text-right">
                                <span class="text-sm font-bold text-white">{{ item.price }} CC</span>
                                <button
                                    class="block text-[10px] text-blue-400 uppercase font-bold mt-1 hover:underline">Purchase
                                    Set</button>
                            </div>
                        </div>

                        <div
                            class="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex justify-between items-center gap-4 hover:border-white/20 transition-all">
                            <div v-for="p in item.pieces" :key="p"
                                class="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
                                <img :src="`/assets/skins/${item.folder}/black-${p}.svg`"
                                    class="absolute inset-0 w-full h-full opacity-40" />

                                <img :src="`/assets/skins/${item.folder}/white-${p}.svg`"
                                    class="absolute inset-0 w-full h-full"
                                    style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                            </div>
                        </div>
                    </div>

                    <div v-else class="inline-block w-full max-w-[280px]">
                        <div
                            class="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-white/20 transition-all text-center">
                            <div class="relative w-32 h-32 mx-auto mb-6">
                                <img :src="`/assets/skins/${item.folder}/black-${item.piece}.svg`"
                                    class="absolute inset-0 w-full h-full opacity-40" />
                                <img :src="`/assets/skins/${item.folder}/white-${item.piece}.svg`"
                                    class="absolute inset-0 w-full h-full"
                                    style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                            </div>
                            <h3 class="text-lg font-bold text-white">{{ item.name }}</h3>
                            <p class="text-gray-500 text-xs mb-4">{{ item.price }} CC</p>
                            <button
                                class="w-full py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-all">
                                Buy Piece
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Any extra polish here */
</style>