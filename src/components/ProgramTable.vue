<template>
  <div class="card">
    <h3>Program</h3>
    <div class="scroll">
      <div v-for="(r, idx) in rounds" :key="idx" style="margin-bottom:10px;">
        <table class="table">
          <thead>
            <tr>
              <th class="sticky">Position</th>
              <th class="sticky">{{ idx+1 }}st Lap • {{ r.distance }}m</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(id, i) in r.participants" :key="id">
              <td>{{ i+1 }}</td>
              <td>{{ getHorse(id)?.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ rounds: Array, getHorse: Function })
</script>
