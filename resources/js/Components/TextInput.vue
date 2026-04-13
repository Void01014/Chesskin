<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input 
        class="block w-full !bg-white/5 border-none !text-white rounded-2xl focus:!bg-white/10 focus:ring-1 focus:ring-white/20 transition-all duration-300 py-4 px-6 placeholder-gray-600 shadow-sm" 
        v-model="model"
        ref="input" 
    />
</template>

<style scoped>
/* Permanent fix for the "Autofill Flash" on dark backgrounds */
:deep(input:-webkit-autofill),
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
    border-radius: 1rem;
}
</style>