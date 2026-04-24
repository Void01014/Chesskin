<script setup>
import Navbar from '@/Components/Navbar.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

defineProps({
    mustVerifyEmail: { type: Boolean },
    status: { type: String },
});

const page = usePage()
const user = computed(() => page.props.auth.user)
</script>

<template>
    <Head title="Profile" />

    <div class="bg-[#050505] text-white min-h-screen w-full selection:bg-white selection:text-black">

        <!-- Background glows -->
        <div class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        <div class="fixed bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <Navbar :user="user" />

        <main class="pt-36 pb-20 px-6 max-w-3xl mx-auto space-y-6">

            <!-- Profile Info -->
            <div class="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
                <UpdateProfileInformationForm
                    :must-verify-email="mustVerifyEmail"
                    :status="status"
                    class="max-w-xl" />
            </div>

            <!-- Password -->
            <div class="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
                <UpdatePasswordForm class="max-w-xl" />
            </div>

            <!-- Delete Account -->
            <div class="bg-red-950/20 border border-red-500/10 rounded-3xl p-8">
                <DeleteUserForm class="max-w-xl" />
            </div>

        </main>
    </div>
</template>