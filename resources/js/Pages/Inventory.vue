<script setup>
import { ref, computed } from 'vue';
import { Head, router, usePage } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Navbar from '@/Components/Navbar.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import EquipToast from '@/Components/EquipToast.vue';

const page = usePage()
const user = computed(() => page.props.auth.user)

const props = defineProps({
    items: Array,
    flash: Object
})

const activeTab = ref('pieces')
const search = ref('')

const setTab = (tab) => {
    activeTab.value = tab
}

// ===== PIECES =====
const filteredPieces = computed(() => {
    return props.items.filter(item => {
        if (item.type !== 'piece') return false

        if (search.value &&
            !item.name.toLowerCase().includes(search.value.toLowerCase()))
            return false

        return true
    })
})

// ===== BOARDS =====
const boards = computed(() => {
    return props.items.filter(i => i.type === 'board')
})

console.log(props.items);


// ===== SETS (grouped) =====
const sets = computed(() => {
    const grouped = {}

    props.items.forEach(item => {
        if (!item.bundle_id) return

        if (!grouped[item.bundle_id]) {
            grouped[item.bundle_id] = {
                id: item.bundle_id,
                is_bundle: true,
                name: item.bundle?.name || 'Set',
                folder: item.folder,
                items: []
            }
        }

        grouped[item.bundle_id].items.push(item)
    })

    return Object.values(grouped)
})

const pieces = ['pawn', 'knight', 'bishop', 'queen', 'king', 'rook']

const equip = async (item) => {
    console.log(item);

    const payLoad = item.is_bundle
        ? { bundle_id: item.id }
        : { item_id: item.id };

    router.post('equip', payLoad, {
        onStart: () => {
            console.log('Equipping...')
        },
        onSuccess: () => {
            console.log('Equip successful')
        },
        onError: (err) => {
            console.error(err)
        }
    })
}
</script>

<template>

    <Head title="Inventory" />
    <Navbar :user="user" />

    <AuthenticatedLayout>

        <div class="flex mt-20 max-w-7xl mx-auto">

            <!-- 🔹 SIDEBAR -->
            <div class="w-24 flex flex-col items-center gap-6 py-6 border-r border-white/10">

                <button @click="setTab('pieces')"
                    :class="activeTab === 'pieces' ? 'bg-white text-black' : 'bg-white/10 text-white'"
                    class="p-3 rounded-xl transition">
                    ♟️
                </button>

                <button @click="setTab('sets')"
                    :class="activeTab === 'sets' ? 'bg-white text-black' : 'bg-white/10 text-white'"
                    class="p-3 rounded-xl transition">
                    🧩
                </button>

                <button @click="setTab('boards')"
                    :class="activeTab === 'boards' ? 'bg-white text-black' : 'bg-white/10 text-white'"
                    class="p-3 rounded-xl transition">
                    🟫
                </button>
            </div>

            <!-- 🔹 MAIN CONTENT -->
            <div class="flex-1 px-8 py-6">

                <!-- SEARCH -->
                <div class="max-w-md mb-8">
                    <input v-model="search" type="text" placeholder="Search..."
                        class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-white focus:border-white/30" />
                </div>

                <!-- ================= PIECES ================= -->
                <div v-if="activeTab === 'pieces'" class="grid grid-cols-2 md:grid-cols-4 gap-6">

                    <div v-for="piece in filteredPieces" :key="piece.id"
                        class="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">

                        <div class="w-24 h-24 mx-auto relative mb-6">
                            <img :src="`/assets/skins/${piece.folder}/black-${piece.slug}.svg`"
                                class="absolute inset-0 w-full h-full opacity-40" />
                            <img :src="`/assets/skins/${piece.folder}/white-${piece.slug}.svg`"
                                class="absolute inset-0 w-full h-full"
                                style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                        </div>

                        <h3 class="text-white font-bold mb-3">{{ piece.name }}</h3>
                        <PrimaryButton
                            :class="['w-full py-2', piece.is_equipped ? 'bg-white/25 pointer-events-none' : '']"
                            @click="equip(piece)">
                            {{ piece.is_equipped ? 'Equipped' : 'Equip' }}
                        </PrimaryButton>
                    </div>

                </div>

                <!-- ================= SETS ================= -->
                <div v-else-if="activeTab === 'sets'" class="space-y-10">

                    <div v-for="set in sets" :key="set.id" class="bg-white/5 border border-white/10 rounded-[2rem] p-8">

                        <h3 class="text-xl text-white font-bold mb-4">{{ set.name }}</h3>

                        <div class="bg-white/5 border border-white/10 rounded-[2rem] p-8  flex flex-col gap-3">
                            <div class="flex justify-between items-center gap-4 hover:border-white/20 transition-all">
                                <div v-for="p in pieces" :key="p"
                                    class="relative w-20 h-20 group-hover:scale-110 transition-transform duration-500">
                                    <img :src="`/assets/skins/${set.folder}/black-${p}.svg`"
                                        class="absolute inset-0 w-full h-full opacity-40" />
                                    <img :src="`/assets/skins/${set.folder}/white-${p}.svg`"
                                        class="absolute inset-0 w-full h-full"
                                        style="clip-path: polygon(0 0, 100% 0, 0 100%);" />
                                </div>
                            </div>
                            <div class="flex items-center justify-between border-t border-white/10 pt-4">
                                <span class="text-sm font-bold text-white">
                                    {{ set.description }}
                                </span>
                                <div class="flex gap-5">
                                    <PrimaryButton class="!px-3 !py-2 !rounded-xl" @click="equip(set)">
                                        Equip Set
                                    </PrimaryButton>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

                <!-- ================= BOARDS ================= -->
                <div v-else-if="activeTab === 'boards'" class="grid grid-cols-2 md:grid-cols-3 gap-6">

                    <div v-for="board in boards" :key="board.id"
                        class="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">

                        <img :src="`/assets/skins/boards/${board.slug}.svg`"
                            class="w-full aspect-square rounded-lg shadow-xl mb-6" />

                        <h3 class="text-white font-bold mb-3">{{ board.name }}</h3>

                        <PrimaryButton
                            :class="['w-full py-2', board.is_equipped ? 'bg-white/25 pointer-events-none' : '']"
                            @click="equip(board)">
                            {{ board.is_equipped ? 'Equipped' : 'Equip' }}
                        </PrimaryButton>
                    </div>

                </div>

            </div>

        </div>

        <EquipToast :show="$page.props.flash?.success" :message="$page.props.flash?.success" type="success"
            @close="$page.props.flash.success = null"></EquipToast>
    </AuthenticatedLayout>
</template>