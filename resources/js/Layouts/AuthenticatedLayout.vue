<script setup>
import Navbar from '@/Components/Navbar.vue';
import { usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const page = usePage()
const user = computed(() => page.props.auth.user)

</script>

<template>
    <div class="selection:bg-white selection:text-black">
        <div class="min-h-screen bg-[#050505] text-white">

            <header class="bg-[#050505] border-b border-white/5" v-if="$slots.header">
                <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div class="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-1">Navigation / Current Page
                    </div>
                    <div class="text-2xl font-black uppercase tracking-tight text-white">
                        <slot name="header" />
                    </div>
                </div>
            </header>

            <main class="relative">
                <div
                    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10">
                </div>

                <div class="py-12">
                    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
/* Ensure the layout feels integrated with the component logic */
:deep(.nav-link) {
    height: 100%;
}
</style>