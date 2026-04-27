<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const showingNavigationDropdown = ref(false);

const page = usePage()
const user = computed(() => page.props.auth.user)
</script>

<template>
    <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl">
        <div
            class="bg-black/40 h-20 backdrop-blur-xl border border-white/10 py-4 px-4 rounded-2xl flex items-center justify-between shadow-2xl transition-all duration-500">

            <div class="flex items-center gap-2">
                <Link :href="route('welcome')" class="flex items-center gap-3 group">
                    <span class="text-lg font-black tracking-[0.4em] uppercase text-white">Chesskin</span>
                </Link>
            </div>

            <div class="hidden md:flex items-center gap-10">
                <NavLink :href="route('welcome')" :active="route().current('welcome')">Home</NavLink>
                <NavLink :href="route('shop')" :active="route().current('shop')">Shop</NavLink>
                <NavLink :href="route('inventory')" :active="route().current('inventory')">Inventory</NavLink>
                <NavLink :href="route('puzzle')" :active="route().current('puzzle')">Puzzles</NavLink>
                <NavLink :href="route('play')" :active="route().current('play')">Play</NavLink>
                <NavLink :href="route('history')" :active="route().current('history')">History</NavLink>
            </div>

            <!-- Desktop auth -->
            <div class="hidden sm:flex sm:items-center">
                <div v-if="user"
                    class="flex items-center gap-2 px-2 py-1.5 bg-zinc-900/70 border border-white/10 rounded-xl backdrop-blur-md shadow-lg text-sm font-semibold tracking-wide">
                    <span class="text-white">{{ user.credits }}</span>
                    <span class="text-zinc-400 text-xs">CC</span>
                </div>
                <div v-if="user" class="relative ms-3">
                    <Dropdown align="right" width="48">
                        <template #trigger>
                            <span class="inline-flex rounded-md">
                                <button type="button"
                                    class="inline-flex items-center rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 transition duration-150 ease-in-out hover:text-white hover:bg-white/10 focus:outline-none">
                                    {{ user.name }}
                                    <svg class="-me-0.5 ms-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        </template>
                        <template #content>
                            <div class="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                <DropdownLink :href="route('profile.edit')"
                                    class="!text-gray-400 hover:!text-white hover:!bg-white/5">
                                    Profile
                                </DropdownLink>
                                <DropdownLink :href="route('logout')" method="post" as="button"
                                    class="!text-gray-400 hover:!text-white hover:!bg-white/5">
                                    Log Out
                                </DropdownLink>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div v-else class="flex gap-3">
                    <a :href="route('login')">
                        <PrimaryButton class="text-white !bg-black ring-1 ring-white hover:text-white hover:text-black">
                            Login
                        </PrimaryButton>
                    </a>
                    <a :href="route('register')">
                        <PrimaryButton>Sign up</PrimaryButton>
                    </a>
                </div>
            </div>

            <!-- Mobile hamburger -->
            <div class="-me-2 flex items-center sm:hidden">

                <div v-if="user"
                    class="flex items-center gap-2 px-3 py-1 bg-zinc-900/70 border border-white/10 rounded-xl backdrop-blur-md text-sm font-semibold tracking-wide">
                    <span class="text-white">{{ user.credits }}</span>
                    <span class="text-zinc-400 text-xs">CC</span>
                </div>


                <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                    class="inline-flex items-center justify-center rounded-xl p-2 text-gray-500 transition duration-150 ease-in-out hover:bg-white/5 hover:text-white focus:outline-none">
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{
                            hidden: showingNavigationDropdown,
                            'inline-flex': !showingNavigationDropdown,
                        }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{
                            hidden: !showingNavigationDropdown,
                            'inline-flex': showingNavigationDropdown,
                        }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile dropdown (outside the nav bar div so it overlays below it) -->
        <div v-if="showingNavigationDropdown"
            class="sm:hidden mt-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <div class="flex flex-col gap-3">
                <NavLink :href="route('welcome')" :active="route().current('welcome')">Home</NavLink>
                <NavLink :href="route('shop')" :active="route().current('shop')">Shop</NavLink>
                <NavLink :href="route('play')" :active="route().current('play')">Play</NavLink>
                <NavLink :href="route('puzzle')" :active="route().current('puzzle')">Puzzles</NavLink>
                <NavLink :href="route('inventory')" :active="route().current('inventory')">Inventory</NavLink>
                <NavLink :href="route('history')" :active="route().current('history')">History</NavLink>
            </div>

            <!-- Mobile auth -->
            <div v-if="user" class="mt-4 border-t border-white/10 pt-3">
                <div class="text-sm text-gray-400 mb-3">{{ user.name }}</div>
                <div class="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <DropdownLink :href="route('profile.edit')"
                        class="!text-gray-400 hover:!text-white hover:!bg-white/5">
                        Profile
                    </DropdownLink>
                    <DropdownLink :href="route('logout')" method="post" as="button"
                        class="!text-gray-400 hover:!text-white hover:!bg-white/5">
                        Log Out
                    </DropdownLink>
                </div>
            </div>
            <div v-else class="mt-4 border-t border-white/10 pt-3 flex gap-3">
                <a :href="route('login')">
                    <PrimaryButton class="text-white !bg-black ring-1 ring-white hover:text-white hover:text-black">
                        Login
                    </PrimaryButton>
                </a>
                <a :href="route('register')">
                    <PrimaryButton>Sign up</PrimaryButton>
                </a>
            </div>
        </div>
    </nav>
</template>