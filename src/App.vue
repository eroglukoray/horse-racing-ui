<template>
  <div>
    <div class="header">
      <h1>Horse Racing</h1>
      <div class="actions">
        <button class="btn" @click="onGenerate">GENERATE PROGRAM</button>
        <button class="btn secondary" :disabled="!isGenerated || busy" @click="onStart">
          {{ busy ? 'RUNNING...' : 'START' }}
        </button>
      </div>
    </div>

    <div class="layout">
      <HorseList :horses="store.state.horses" />

      <Track
        :participants="currentParticipants"
        :times="currentTimes"
        :playing="playingRound >= 0"
        :distance="currentDistance"
        :label="trackLabel"
      />

      <div class="twoCols">
        <ProgramTable :rounds="store.state.rounds" :getHorse="getHorse" />
        <ResultsTable :results="store.state.results" :getHorse="getHorse" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import HorseList from './components/HorseList.vue'
import ProgramTable from './components/ProgramTable.vue'
import ResultsTable from './components/ResultsTable.vue'
import Track from './components/Track.vue'

const store = useStore()
const busy = ref(false)
const playingRound = ref(-1)
const lastFinished = ref(null)

const isGenerated = computed(() => store.state.isGenerated)
function getHorse(id){ return store.getters.getHorseById(id) }

function ordinal(n){
  const s=['th','st','nd','rd'], v=n%100
  return n + (s[(v-20)%10] || s[v] || s[0])
}

function onGenerate(){
  store.commit('RESET')
  store.dispatch('generateAll')
}

const currentParticipants = computed(() => {
  const idx = playingRound.value
  return idx < 0 ? [] : store.state.rounds[idx].participants
})
const currentTimes = computed(() => {
  const idx = playingRound.value
  return idx < 0 ? [] : (store.state.rounds[idx].times || [])
})
const currentDistance = computed(() => {
  const idx = playingRound.value
  return idx < 0 ? null : store.state.rounds[idx].distance
})
const trackLabel = computed(() => {
  if (playingRound.value >= 0){
    const i = playingRound.value
    const dist = store.state.rounds[i]?.distance
    return `${ordinal(i+1)} Lap • ${dist}m`
  }
  if (lastFinished.value){
    const { idx, distance } = lastFinished.value
    return `Finished: ${ordinal(idx+1)} Lap • ${distance}m`
  }
  return ''
})

function computeTimes(distance, ids){
  return ids.map(id => {
    const h = getHorse(id)
    const base = distance / 250            // hız ayarı
    const condBonus = (120 - h.condition) / 120
    const randomFactor = Math.random() * 0.12
    const time = base * (1 + condBonus*0.30 + randomFactor)
    return { horseId: id, time: Math.max(1, Number(time) || 1) }
  })
}

async function runRound(i){
  const round = store.state.rounds[i]
  const times = computeTimes(round.distance, round.participants)
  store.commit('SET_ROUND_TIMES', { roundIndex: i, times })
  playingRound.value = i

  const maxT = Math.max(...times.map(t => t.time))
  await new Promise(res => setTimeout(res, (maxT*1000) + 400))

  const placements = [...times].sort((a,b) => a.time - b.time)
  store.commit('PUSH_RESULT', { roundIndex: i, distance: round.distance, placements })
  lastFinished.value = { idx: i, distance: round.distance }
  playingRound.value = -1
}

async function onStart(){
  if (!store.state.isGenerated || busy.value) return
  busy.value = true
  try{
    for (let i=0; i<store.state.rounds.length; i++){
      await runRound(i)
    }
  } finally {
    playingRound.value = -1
    busy.value = false
  }
}
</script>
