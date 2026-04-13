<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'text-white border-b border-white/20'
        : 'text-gray-500 hover:text-white border-b border-transparent'
);
</script>

<template>
    <Link
        :href="href"
        class="inline-flex items-center pt-1 pb-1 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 focus:outline-none"
        :class="classes"
    >
        <slot />
    </Link>
</template>