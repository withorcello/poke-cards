<template>
  <div :class="`flex-column ${cols}`">
    <div
      class="flex-row justify-center align-center bg-grey-100 bra-2 rows pa-3"
    >
      <div v-if="!stats" class="fluid flex-column row-gap-2">
        <img
          :alt="`Imagem do pokemon ${pokemon.name}`"
          :src="pokemon.img"
          class="fluid ba-2 b-dashed b-dark"
          @click="stats = !stats"
        />
        <span
          :class="`font-5 text-center font-roboto font-bold ${
            evolutions.length ? 'py-4' : ''
          }`"
          @click="switchControl()"
        >
          {{ pokemon.name?.toUpperCase() }}
        </span>
        <button
          v-if="!evolutions.length"
          :class="`b-none bra-2 font-2 font-bold font-roboto color-light py-2 ${
            loading ? 'bg-grey-400' : 'bg-green'
          }`"
          @click="!loading && findSpecie(pokemon.id)"
        >
          Evolutions
        </button>
      </div>
      <div
        v-else
        class="fluid flex-column row-gap-3 py-1"
        @click="stats = !stats"
      >
        <div
          v-for="stat in pokemon.stats"
          :key="stat.text"
          class="fluid flex-row justify-between ba-1 b-dashed b-dark pa-1"
        >
          <span class="font-roboto font-1 font-bold">{{ stat.text }}:</span>
          <span class="font-roboto font-1">{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { app } from "../stores/storeApp";

export default {
  name: "ComponenteCard",

  props: {
    pokemon: {
      type: Object,
      default: () => {},
    },
    cols: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    stats: false,
  }),

  computed: {
    ...mapState(app, ["evolutions", "loading"]),
  },

  methods: {
    ...mapActions(app, ["findSpecie"]),
  },
};
</script>
