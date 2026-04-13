<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout class="bg-[#050505] text-white min-h-screen flex items-center justify-center py-12">

        <Head title="Register" />

        <form @submit.prevent="submit"
            class="w-full max-w-md bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">

            <div class="mb-5">
                <InputLabel for="name" value="Full Name" />
                <TextInput id="name" type="text" v-model="form.name" required autofocus placeholder="Enter your name"
                    autocomplete="name" />
                <InputError class="mt-2 text-xs" :message="form.errors.name" />
            </div>

            <div class="mt-4 mb-5">
                <InputLabel for="email" value="Email Address" />
                <TextInput id="email" type="email" v-model="form.email" required placeholder="name@example.com"
                    autocomplete="username" />
                <InputError class="mt-2 text-xs" :message="form.errors.email" />
            </div>

            <div class="mt-4 mb-5">
                <InputLabel for="password" value="Password" />
                <TextInput id="password" type="password" v-model="form.password" required autocomplete="new-password" />
                <InputError class="mt-2 text-xs" :message="form.errors.password" />
            </div>

            <div class="mt-4 mb-5">
                <InputLabel for="password_confirmation" value="Confirm Password" />
                <TextInput id="password_confirmation" type="password" v-model="form.password_confirmation" required
                    autocomplete="new-password" />
                <InputError class="mt-2 text-xs" :message="form.errors.password_confirmation" />
            </div>

            <div class="mt-10 flex flex-col gap-6">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Create Account
                </PrimaryButton>

                <div class="text-center">
                    <Link :href="route('login')"
                        class="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                        Already registered? Log in
                    </Link>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>

<style scoped>
/* Scoped overrides just for the card's specific behavior if needed */
:deep(input) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>