<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout class="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-gray-400">
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="w-full max-w-md bg-[#0f0f0f] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
            <div class="mb-6">
                <InputLabel for="email" value="Email Address" />
                <TextInput
                    id="email"
                    type="email"
                    v-model="form.email"
                    required
                    autofocus
                    placeholder="name@example.com"
                    autocomplete="username"
                />
                <InputError class="mt-2 text-xs" :message="form.errors.email" />
            </div>

            <div class="mb-2">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />
                <InputError class="mt-2 text-xs" :message="form.errors.password" />
            </div>

            <div class="flex items-center justify-between mt-4 px-2">
                <label class="flex items-center cursor-pointer group">
                    <Checkbox name="remember" v-model:checked="form.remember" 
                        class="!bg-white/10 !border-none !rounded-lg checked:!bg-white focus:ring-0" />
                    <span class="ms-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>

                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="text-xs text-gray-500 hover:text-white transition-colors"
                >
                    Forgot password?
                </Link>
            </div>

            <div class="mt-10">
                <PrimaryButton
                    class="w-full"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Log In
                </PrimaryButton>
            </div>

            <div class="mt-8 text-center">
                <Link
                    :href="route('register')"
                    class="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                >
                    Create a new account
                </Link>
            </div>
        </form>
    </GuestLayout>
</template>

<style scoped>
/* Keeping only the logic-dependent transitions if needed */
:deep(input) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>