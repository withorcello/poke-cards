<template>
  <div>
    <div class="fluid flex-row justify-between bg-grey-700 pa-2 brt-3">
      <span
        :class="`flex-row justify-center font-5 text-center font-roboto font-bold color-dark pa-1${
          evolutions.length ? 'py-4' : ''
        }`"
      >
        POKELIST
      </span>
      <div>
        <button
          :class="`b-none bra-2 font-2 font-roboto font-bold color-dark ${
            loading || !registros.length || !pagination.previous
              ? 'bg-grey-400'
              : 'bg-green'
          } pa-2 px-3 mx-1`"
          @click="
            !loading &&
              registros.length &&
              !!pagination.previous &&
              listPokemon('previous')
          "
        >
          {{ "<" }}
        </button>
        <button
          :class="`b-none bra-2 font-2 font-roboto font-bold color-dark ${
            loading || !registros.length || !pagination.next
              ? 'bg-grey-400'
              : 'bg-green'
          } pa-2 px-3 mx-1`"
          @click="
            !loading &&
              registros.length &&
              !!pagination.next &&
              listPokemon('next')
          "
        >
          {{ ">" }}
        </button>
      </div>
    </div>
    <div
      ref="dataIterator"
      :class="`fluid flex-row justify-center column-gap-5 row-gap-6 overflow-auto bg-grey-800 pa-4`"
    >
      <Card v-for="card in cards" :key="card.id" :cols="cols" :pokemon="card" />
    </div>
    <div
      class="flex-row justify-start fluid bg-grey-700 pa-2 brb-1 font-2 font-roboto font-bold color-dark"
    >
      Total: {{ total }}
    </div>
  </div>
</template>
<script>
import Card from "./Card.vue";
import { app } from "../stores/storeApp";
import { mapActions, mapState } from "pinia";

export default {
  name: "ComponenteDataIterator",
  components: {
    Card,
  },
  data: () => ({
    cols: "cols-1",
    height: 0,
  }),

  computed: {
    ...mapState(app, [
      "evolutions",
      "loading",
      "pagination",
      "pokemon",
      "registros",
      "total",
    ]),
    cards() {
      if (this.evolutions.length) return this.evolutions;
      else if (this.pokemon.id) return [this.pokemon];
      else if (this.registros.length) return this.registros;
      return [];
    },
  },

  mounted() {
    this.heigthAuto();
    this.calculateWidth();
    window.addEventListener("resize", this.heigthAuto);
  },
  unmounted() {
    window.removeEventListener("resize", this.heigthAuto);
  },

  methods: {
    ...mapActions(app, ["listPokemon"]),
    calculateWidth() {
      const width = window.innerWidth;
      if (width >= 1900) this.cols = "cols-1-2";
      else if (width >= 1700) this.cols = "cols-1-1";
      else if (width >= 1500) this.cols = "cols-1-3";
      else if (width >= 1300) this.cols = "cols-1-5";
      else if (width >= 1100) this.cols = "cols-2";
      else if (width >= 500) this.cols = "cols-3";
    },

    heigthAuto() {
      const windowHeight = window.innerHeight;
      const offsetTop = this.$refs.dataIterator.offsetTop;

      this.$refs.dataIterator.style.height = `${
        windowHeight - offsetTop - 120
      }px`;
    },

    switchPage(param) {
      this.listPokemon(param);
    },
  },
};
</script>
