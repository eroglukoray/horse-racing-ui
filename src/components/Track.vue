<template>
  <div class="card centerTrack">
    <h3 style="margin-bottom:8px;">Track</h3>
    <div class="trackWrap">
      <div class="finish"></div>
      <div v-for="(lane, i) in lanes" :key="lane.id" class="lane">
        <div class="laneNum">{{ i+1 }}</div>
        <div class="horseSprite" :style="horseStyle(lane.id)"></div>
      </div>
    </div>
    <div class="trackFooter">{{ label }}</div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  participants: Array,   // [horseId]
  times: Array,          // [{horseId,time}]
  playing: Boolean,
  distance: Number,
  label: String
})

const progress = ref({})       // { horseId: 0..100 }
const rafId = ref(0)
const startAt = ref(0)

const lanes = computed(() => (props.participants || []).map(id => ({ id })))

function horseStyle(id){
  const p = progress.value[id] || 0
  return { left: p + '%' }
}

function step(ts){
  if (!startAt.value) startAt.value = ts
  const elapsed = (ts - startAt.value)/1000
  let done = true
  for (const t of (props.times || [])){
    const total = Math.max(0.5, Number(t.time) || 0.5)
    const id = t.horseId
    const pct = Math.min(100, (elapsed/total)*100)
    if (pct < 100) done = false
    progress.value[id] = pct
  }
  if (!done){
    rafId.value = requestAnimationFrame(step)
  }
}

watch(() => props.playing, (v) => {
  cancelAnimationFrame(rafId.value)
  if (v){
    progress.value = Object.fromEntries((props.participants||[]).map(id => [id, 0]))
    startAt.value = 0
    // küçük bir gecikme ile frame başlat
    rafId.value = requestAnimationFrame(step)
  }
})
</script>
