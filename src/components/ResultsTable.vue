<template>
  <div class="card">
    <h3>Results</h3>
    <div class="scroll">
      <div v-if="!results.length" class="small" style="padding:8px 10px;">No results yet.</div>
      <div v-for="r in results" :key="r.roundIndex" style="margin-bottom:10px;">
        <table class="table">
          <thead>
            <tr>
              <th class="sticky">Position</th>
              <th class="sticky">{{ r.roundIndex+1 }}st Lap • {{ r.distance }}m</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in r.placements" :key="p.horseId">
              <td>{{ i+1 }}</td>
              <td>{{ getHorse(p.horseId)?.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ results: Array, getHorse: Function })
</script>
