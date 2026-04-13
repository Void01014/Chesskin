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

</script>

<template>
    <div class="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden">

        <div
            class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none">
        </div>
        <div
            class="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none">
        </div>

        <Navbar :user="auth.user" />

        <main class="relative pt-56 pb-20 px-6 flex flex-col items-center text-center">

            <div class="absolute top-40 flex gap-4 opacity-10 pointer-events-none">
                <div class="w-32 h-32 border border-white rotate-12 rounded-xl"></div>
                <div class="w-32 h-32 border border-white -rotate-12 rounded-xl bg-white/10"></div>
                <div class="w-32 h-32 border border-white rotate-6 rounded-xl"></div>
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
                <PrimaryButton class="!px-16 !py-6 !text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    Start Customizing
                </PrimaryButton>

                <Link href="/shop"
                    class="px-16 py-6 rounded-2xl border border-white/5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/5 transition-all flex items-center justify-center">
                    Browse Collection
                </Link>
            </div>

            <div class="mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
                <div v-for="i in 4" :key="i"
                    class="aspect-square rounded-3xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-end items-start group hover:border-white/20 transition-all">
                    <div
                        class="w-full h-full bg-gradient-to-b from-white/10 to-transparent rounded-2xl mb-4 group-hover:scale-95 transition-transform duration-500">
                    </div>
                    <span class="text-[9px] uppercase tracking-widest text-gray-600">Theme 00{{ i }}</span>
                    <span class="text-[11px] font-bold uppercase tracking-widest">Variant Skin</span>
                </div>
            </div>
        </main>

        <footer class="py-20 text-center opacity-30">
            <p class="text-[9px] uppercase tracking-[0.5em]">Chesskin // Digital Craft for the 64 Squares</p>
        </footer>
    </div>
</template>

<style scoped>
.nav-link {
    @apply text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300;
}

/* Subtly moving background for that "Nova" energy */
main::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: -1;
}
</style>