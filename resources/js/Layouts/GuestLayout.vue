<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
        <div class="">
            <Link href="/">
                <ApplicationLogo class="h-20 w-20 fill-current text-gray-500" />
            </Link>
        </div>

        <div class="mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
