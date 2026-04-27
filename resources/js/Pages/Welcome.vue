<script setup>
import { Link } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Navbar from '@/Components/Navbar.vue';

defineProps({
    auth: Object,
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

const items = [
    { name: 'Adventure Time pawn', folder: 'adventure_time', type: 'pawn' },
    { name: 'Walter White', folder: 'breaking_bad', type: 'pawn' },
    { name: 'Naruto Queen', folder: 'naruto', type: 'queen' },
    { name: 'Marble Pawn', folder: 'marble', type: 'pawn' },
    { name: 'Ace Attorney Bishop', folder: 'ace_attorney', type: 'bishop' },
    { name: 'Classic Rook', folder: 'classic', type: 'rook' },
    { name: 'Chesskin Knight', folder: 'chesskin', type: 'knight' },
]

</script>

<template>
    <div class="bg-[#050505] text-white w-full selection:bg-white selection:text-black">

        <div
            class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none">
        </div>
        <div
            class="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none">
        </div>

        <Navbar :user="auth.user" />

        <main class="overflow-hidden relative pt-56 pb-20 px-6 flex flex-col items-center text-center">

            <div class="absolute top-40 flex gap-4 opacity-50 pointer-events-none">
                <img src="/assets/skins/ace_attorney/white-rook.svg"
                    class="w-32 h-32  rotate-12 rounded-xl bg-white/10" />
                <img src="/assets/skins/marble/white-pawn.svg" class="w-32 h-32  -rotate-12 rounded-xl bg-white/10" />
                <img src="/assets/skins/ace_attorney/black-queen.svg"
                    class="w-32 h-32  rotate-6 rounded-xl bg-white/10" />
            </div>

            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                Master the <span
                    class="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">Aesthetic.</span>
            </h1>

            <p class="max-w-2xl text-gray-500 text-sm md:text-lg tracking-wide leading-relaxed mb-12">
                Why play on a wooden board when you can play on glass, neon, or obsidian?
                <span class="text-white">Chesskin</span> lets you redefine the 64 squares with exclusive piece skins and
                board themes.
            </p>

            <div class="flex flex-col md:flex-row gap-4">
                <Link href="/shop"
                    class="bg-white/90 text-black px-16 py-6 rounded-2xl !text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] uppercase tracking-[0.3em] font-bold hover:bg-white hover:scale-105 transition-all duration-1000 flex items-center justify-center">
                    Start Customizing
                </Link>

                <Link href="/inventory"
                    class="px-16 py-6 rounded-2xl border-2 border-white/20 text-sm uppercase tracking-[0.3em] font-bold hover:bg-white/5 hover:scale-105 transition-all duration-1000 flex items-center justify-center">
                    Browse Collection
                </Link>
            </div>
            <div
                class="mt-32 w-full max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div class="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                    <template v-for="_ in 2" :key="_">
                        <div v-for="item in items" :key="item.folder"
                            class="flex-shrink-0 w-40 aspect-square rounded-3xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center items-center group hover:border-white/20 transition-all">

                            <div
                                class="relative w-24 h-24 group-hover:scale-110 transition-transform duration-500 ease-out">
                                <img :src="`/assets/skins/${item.folder}/black-${item.type}.svg`" alt=""
                                    class="absolute inset-0 w-full h-full opacity-20" />
                                <img :src="`/assets/skins/${item.folder}/white-${item.type}.svg`" alt=""
                                    class="absolute inset-0 w-full h-full object-contain"
                                    style="clip-path: polygon(0 0, 100% 0, 0 100%); -webkit-clip-path: polygon(0 0, 100% 0, 0 100%);" />
                            </div>

                            <span
                                class="mt-4 text-white/50 text-xs font-medium uppercase tracking-widest group-hover:text-white transition-colors">
                                {{ item.name }}
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </main>

        <footer class="py-20 text-center opacity-30">
        </footer>
    </div>
</template>

<style scoped>
.nav-link {
    @apply text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300;
}
</style>