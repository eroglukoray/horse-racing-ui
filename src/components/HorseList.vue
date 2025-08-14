<template>
  <div class="card">
    <h3>Horse List (1–20)</h3>
    <div class="scroll">
      <table class="table">
        <thead>
          <tr><th>Name</th><th>Condition</th><th>Color</th></tr>
        </thead>
        <tbody>
          <tr v-for="h in horses" :key="h.id">
            <td>{{ h.name }}</td>
            <td>{{ h.condition }}</td>
            <td><span class="swatch" :style="{ background:h.color }"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footerBar">Total: {{ horses.length }}</div>
  </div>
</template>
<script setup>
defineProps({ horses: Array })
</script>
