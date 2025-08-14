import { createStore } from 'vuex'

const DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

function uniquePalette(){
  return ['#E74C3C','#3498DB','#2ECC71','#9B59B6','#F1C40F','#E67E22','#1ABC9C','#34495E','#D35400','#7F8C8D',
          '#C0392B','#2980B9','#27AE60','#8E44AD','#F39C12','#D35400','#16A085','#2C3E50','#95A5A6','#6C5CE7']
}

function pickRandom(arr, n){
  const pool = [...arr]; const chosen = []
  while (chosen.length < n){
    const i = Math.floor(Math.random()*pool.length)
    chosen.push(pool.splice(i,1)[0])
  }
  return chosen
}

const EN_NAMES = ['Thunderbolt','Midnight','Shadow','Blaze','Storm','Lightning','Comet','Ranger','Maverick','Apollo','Titan','Eclipse','Phantom','Rocket','Hunter','Ace','Duke','Bandit','Ghost','Diesel'];

export default createStore({
  state(){
    return {
      horses: [],              // 20 horses with name/condition/color
      rounds: [],              // [{ distance, participants: [ids], times? }]
      results: [],             // results per round
      isGenerated: false,
      racing: false,
      paused: false,
      currentRound: -1
    }
  },
  getters: {
    getHorseById: (state) => (id) => state.horses.find(h => h.id === id)
  },
  mutations: {
    SET_HORSES(state, horses){ state.horses = horses },
    SET_ROUNDS(state, rounds){ state.rounds = rounds },
    SET_GENERATED(state, v){ state.isGenerated = v },
    SET_RACING(state, v){ state.racing = v },
    SET_PAUSED(state, v){ state.paused = v },
    SET_CURRENT_ROUND(state, i){ state.currentRound = i },
    SET_ROUND_TIMES(state, {roundIndex, times}){ state.rounds[roundIndex].times = times },
    PUSH_RESULT(state, res){ state.results.push(res) },
    RESET(state){
      state.rounds = []; state.results = []; state.isGenerated = false;
      state.racing = false; state.paused = false; state.currentRound = -1;
    }
  },
  actions: {
    generateAll({ commit }){
      // 1) Horses
      const colors = uniquePalette()
      const horses = Array.from({length: 20}).map((_, i) => ({
        id: i+1,
        name: EN_NAMES[i],
        color: colors[i],
        condition: Math.floor(Math.random()*100)+1
      }))
      commit('SET_HORSES', horses)
      // 2) Rounds with participants (10 random per round)
      const rounds = DISTANCES.map(distance => {
        const ids = pickRandom(horses.map(h => h.id), 10)
        return { distance, participants: ids, times: [] }
      })
      commit('SET_ROUNDS', rounds)
      commit('SET_GENERATED', true)
    }
  }
})
