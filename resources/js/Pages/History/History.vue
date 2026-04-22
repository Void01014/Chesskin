<script setup>
import { computed, ref } from 'vue'
import { Head, usePage } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import Navbar from '@/Components/Navbar.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'

const page = usePage()
const user = computed(() => page.props.auth.user)

const props = defineProps({
  history: Object
})

const search = ref('')
const modeFilter = ref(['pvp', 'pvai'])

const toggleMode = (mode) => {
  if (modeFilter.value.includes(mode)) {
    if (modeFilter.value.length === 1) return
    modeFilter.value = modeFilter.value.filter(m => m !== mode)
  } else {
    modeFilter.value.push(mode)
  }
}

const filteredGames = computed(() => {
  return props.history.data.filter(g => {
    if (!modeFilter.value.includes(g.mode)) return false

    if (search.value && !g.mode.toLowerCase().includes(search.value.toLowerCase()))
      return false

    return true
  })
})

const stats = computed(() => {
  const games = filteredGames.value

  const total = games.length
  const wins = games.filter(g => g.user_won).length
  const losses = games.filter(g => !g.user_won && !g.is_draw).length
  const draws = games.filter(g => g.is_draw).length

  const avgMoves = total
    ? Math.round(games.reduce((acc, g) => acc + g.move_count, 0) / total)
    : 0

  const winRate = total ? Math.round((wins / total) * 100) : 0

  return { total, wins, losses, draws, avgMoves, winRate }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const resultText = (g) => {
  if (g.is_draw) return 'Draw'
  return g.user_won ? 'Victory' : 'Defeat'
}

const resultColor = (g) => {
  if (g.is_draw) return 'text-gray-400'
  return g.user_won ? 'text-green-400' : 'text-red-400'
}
</script>

<template>
  <Head title="History" />
  <Navbar :user="user" />

  <AuthenticatedLayout>
    <div class="max-w-6xl mt-20 mx-auto px-4 py-8">

      <!-- SEARCH + FILTERS -->
      <div class="flex flex-col gap-6 mb-12 max-w-md mx-auto">
        <div class="flex gap-4">
          <input v-model="search" type="text" placeholder="Search mode..."
            class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-white/30" />
        </div>

        <div class="flex justify-center gap-3">
          <PrimaryButton @click="toggleMode('pvp')"
            :class="modeFilter.includes('pvp') ? '!bg-white text-black' : '!bg-black text-white ring ring-white/20'">
            PvP
          </PrimaryButton>

          <PrimaryButton @click="toggleMode('pvai')"
            :class="modeFilter.includes('pvai') ? '!bg-white text-black' : '!bg-black text-white ring ring-white/20'">
            PvAI
          </PrimaryButton>
        </div>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div class="text-xs text-gray-400">Games</div>
          <div class="text-white text-2xl font-bold">{{ stats.total }}</div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div class="text-xs text-gray-400">Wins</div>
          <div class="text-green-400 text-2xl font-bold">{{ stats.wins }}</div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div class="text-xs text-gray-400">Losses</div>
          <div class="text-red-400 text-2xl font-bold">{{ stats.losses }}</div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div class="text-xs text-gray-400">Draws</div>
          <div class="text-gray-300 text-2xl font-bold">{{ stats.draws }}</div>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <div class="text-xs text-gray-400">Win Rate</div>
          <div class="text-white text-2xl font-bold">{{ stats.winRate }}%</div>
        </div>
      </div>

      <!-- HISTORY -->
      <div class="space-y-4">
        <div v-for="game in filteredGames" :key="game.id"
          class="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center hover:border-white/20 transition">

          <div>
            <div :class="resultColor(game)" class="font-bold">
              {{ resultText(game) }}
            </div>
            <div class="text-gray-400 text-xs">
              {{ game.mode.toUpperCase() }} • {{ game.player_color }} • {{ game.move_count }} moves
            </div>
          </div>

          <div class="text-right">
            <div class="text-gray-500 text-xs">
              {{ formatDate(game.created_at) }}
            </div>
          </div>

        </div>

        <div v-if="filteredGames.length === 0" class="text-center text-gray-500 mt-10">
          No games found.
        </div>
      </div>

    </div>
  </AuthenticatedLayout>
</template>
