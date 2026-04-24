<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    message: String,
    type: {
        type: String,
        default: 'success' // success | error
    },
    show: Boolean
});

const emit = defineEmits(['close']);

const visible = ref(false);

watch(
    () => props.show,
    (val) => {
        visible.value = val;

        if (val) {
            setTimeout(() => {
                visible.value = false;
                emit('close');
            }, 2500);
        }
    },
    { immediate: true }
);

const style = computed(() => {
    return props.type === 'success'
        ? 'text-white border-white/10'
        : 'text-zinc-400 border-white/5';
});
</script>

<template>
    <Transition name="fade">
        <div
            v-if="visible"
            class="fixed top-6 right-6 z-[100] w-80"
        >
            <div
                class="relative overflow-hidden bg-zinc-900 border rounded-xl shadow-2xl px-5 py-4"
                :class="style"
            >
                <div class="absolute top-0 left-0 w-full h-[2px] bg-white/10"></div>

                <p class="text-xs uppercase tracking-widest">
                    {{ message }}
                </p>

                <div class="absolute bottom-0 right-0 w-10 h-10 bg-white/5 rotate-45 translate-x-4 translate-y-4"></div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>