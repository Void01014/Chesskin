<script setup>
import { computed, watch } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    gameState: String,
    winner: [Number, null],
    playerColor: String,
});

const emit = defineEmits(['close', 'rematch', 'game-ended']);

const isVisible = computed(() => props.gameState === 'GAME_OVER');

const resultData = computed(() => {
    if (props.winner === null) {
        return { title: 'STALEMATE', color: 'text-zinc-400', sub: '' };
    }

    const userValue = props.playerColor === 'white' ? 1 : 2;
    const didWin = props.winner === userValue;

    return didWin
        ? { title: 'VICTORY', color: 'text-white', sub: `You Won.` }
        : { title: 'DEFEAT', color: 'text-zinc-500', sub: 'You lost' };
});

watch(
    () => props.gameState,
    (newState, oldState) => {
        if (newState === 'GAME_OVER' && oldState !== 'GAME_OVER') {
            emit('game-ended');
        }
    }
);
</script>

<template>
    <Transition name="fade">
        <div v-if="isVisible"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                class="relative w-full max-w-sm overflow-hidden bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl">

                <div
                    class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50">
                </div>

                <div class="px-8 py-10 text-center">
                    <h2 :class="[resultData.color]" class="text-5xl font-black italic tracking-tighter mb-2">
                        {{ resultData.title }}
                    </h2>

                    <p class="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-8">
                        {{ resultData.sub }}
                    </p>

                    <div class="flex items-center justify-center gap-4 mb-8">
                        <div class="h-[1px] flex-1 bg-white/5"></div>
                        <div class="w-2 h-2 rounded-full bg-white/20"></div>
                        <div class="h-[1px] flex-1 bg-white/5"></div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <button @click="emit('rematch')"
                            class="w-full py-4 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors rounded-lg">
                            New Game
                        </button>

                        <button @click="emit('close')"
                            class="w-full py-4 bg-transparent text-white/50 border border-white/5 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all rounded-lg">
                            Return options menu
                        </button>
                    </div>
                </div>

                <div class="absolute bottom-0 right-0 w-16 h-16 bg-white/5 translate-x-8 translate-y-8 rotate-45"></div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>