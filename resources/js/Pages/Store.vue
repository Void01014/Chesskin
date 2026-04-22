<script setup>
import { ref, computed } from 'vue';
import { Head, usePage, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Navbar from '@/Components/Navbar.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const page = usePage()
const user = computed(() => page.props.auth.user)


const props = defineProps({
    variants: Array
})

const search = ref('');
const filters = ref(['pieces', 'sets', 'boards'])
const hideOwned = ref(true)

const toggleFilter = (type) => {
    if (filters.value.includes(type)) {
        if (filters.value.length === 1) return
        filters.value = filters.value.filter(t => t !== type)
    } else {
        filters.value.push(type)
    }
}

const toggleOwned = () => {
    hideOwned.value = !hideOwned.value;
}

const filteredItems = computed(() => {
    return props.variants.filter(item => {

        const typeMatch =
            (item.is_bundle && filters.value.includes('sets')) ||
            (item.type === 'board' && filters.value.includes('boards')) ||
            (!item.is_bundle && item.type === 'piece' && filters.value.includes('pieces'));

        if (!typeMatch) return false

        if (hideOwned.value && item.is_owned)
            return false

        if (!item.name.toLowerCase().includes(search.value.toLowerCase()))
            return false

        return true;
    }
    );
});

const purchaseItem = (item) => {
    router.post('/purchase', {
        item_id: item.id
    }, {
        onStart: () => {
            console.log('Purchasing...')
        },
        onSuccess: () => {
            console.log('Purchase successful')
        },
        onError: (err) => {
            console.error(err)
        }
    })
}

const pieces = ['pawn', 'knight', 'bishop', 'queen', 'king', 'rook']
</script>

<template>

    <Head title="Store" />
    <Navbar :user="user" />

    <AuthenticatedLayout>
        <div class="max-w-6xl mt-20 mx-auto px-4 py-8">
            <div class="flex flex-col justify-center gap-6 relative mb-12 max-w-md mx-auto">
                <div class="flex gap-4 w-full">
                    <input v-model="search" type="text" placeholder="Search skins..."
                        class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-white/30 focus:ring-0 transition-all" />
                    <PrimaryButton @click="toggleOwned()" class="!p-0 ring text-xs  ring-white"
                        :class="[hideOwned ? '!bg-white/90' : '!bg-black text-white']">
                        Hide Owned
                    </PrimaryButton>
                </div>
                <div class="flex justify-center gap-3 w-full">
                    <PrimaryButton @click="toggleFilter('pieces')"
                        :class="[filters.includes('pieces') ? '!bg-white/90 ring ring-green-800' : '!bg-black text-white ring ring-green-700']">
                        Pieces
                    </PrimaryButton>
                    <PrimaryButton @click="toggleFilter('sets')"
                        :class="[filters.includes('sets') ? '!bg-white/90 ring ring-red-800' : '!bg-black text-white ring ring-red-700']">
                        Sets
                    </PrimaryButton>
                    <PrimaryButton @click="toggleFilter('boards')"
                        :class="[filters.includes('boards') ? '!bg-white/90 ring ring-yellow-800' : '!bg-black text-white ring ring-yellow-700']">
                        Boards
                    </PrimaryButton>
                </div>
            </div>

            <div class="absolute ring ring-white rounded-lg py-2 px-5 right-60 text-xl text-bold">{{ user.credits }} CC
            </div>

            <div class="space-y-12">
                <div v-for="item in filteredItems.filter(i => i.is_bundle)" :key="'set-' + item.id" class="group">
                    <div class="flex justify-between items- mb-4 px-2">
                        <div>
                            <h3 class="text-xl font-bold text-white">{{ item.name }}</h3>
                            <span class="text-[10px] text-gray-500 uppercase tracking-widest">Full Collection</span>
                        </div>
                    </div>
                    
                    <div class="bg-white/5 border border-white/10 rounded-[2rem] p-8  flex flex-col gap-3">
                        <div class="flex justify-between items-center gap-4 hover:border-white/20 transition-all">
                            <div v-for="p in pieces" :key="p"
                                class="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
                                <img :src="`/assets/skins/${item.folder}/black-${p}.svg`"
                                    class="absolute inset-0 w-full h-full opacity-40" />
                                <img :src="`/assets/skins/${item.folder}/white-${p}.svg`"
                                    class="absolute inset-0 w-full h-full"
                                    style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between border-t border-white/10 pt-4">
                            <span class="text-sm font-bold text-white">
                                {{ item.description }}
                            </span>
                            <div class="flex gap-5">
                                <span class="text-lg font-bold text-white">
                                    {{ item.price }} <span class="text-sm text-gray-400">CC</span>
                                </span>
                                <PrimaryButton class="!px-3 !py-2 !rounded-xl" @click="purchaseItem(item)">
                                    Purchase Set
                                </PrimaryButton>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div v-for="item in filteredItems.filter(i => !i.is_bundle)" :key="'item-' + item.id"
                        :class="[item.type === 'board' ? 'col-span-2 row-span-2' : 'col-span-1', 'w-full']">

                        <div
                            class="h-full bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-white/20 transition-all flex flex-col justify-between text-center">

                            <div
                                :class="['relative mx-auto mb-6', item.type === 'board' ? 'w-full aspect-square' : 'w-32 h-32']">

                                <template v-if="item.type === 'board'">
                                    <img :src="`/assets/skins/boards/${item.slug}.svg`"
                                        class="w-full h-full rounded-lg shadow-2xl" />
                                </template>

                                <template v-else>
                                    <img :src="`/assets/skins/${item.folder}/black-${item.slug || item.piece}.svg`"
                                        class="absolute inset-0 w-full h-full opacity-40" />
                                    <img :src="`/assets/skins/${item.folder}/white-${item.slug || item.piece}.svg`"
                                        class="absolute inset-0 w-full h-full"
                                        style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                                </template>

                            </div>

                            <div>
                                <h3 :class="['font-bold text-white', item.type === 'board' ? 'text-2xl' : 'text-lg']">{{
                                    item.name }}</h3>
                                <p class="text-gray-500 text-xs mb-4">{{ item.price }} CC</p>
                                <PrimaryButton
                                    class="w-full py-3 bg-white text-black rounded-xl text-xs tracking-widest"
                                    @click="purchaseItem(item)">
                                    {{ item.type === 'board' ? 'Buy Board' : 'Buy Piece' }}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Any extra polish here */
</style>