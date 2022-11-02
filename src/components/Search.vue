<template>
  <div class="fluid flex-row justify-center column-gap-4 pa-2">
    <input
      v-model="name"
      class="cols-4 b-none bra-2 font-5 pa-3 font-roboto bg-grey-100"
      placeholder="Search Pokemon"
      type="text"
      @keydown.enter="!loading && searchPokemon()"
    />
    <button
      :class="`b-none bra-2 font-2 font-roboto font-bold ${
        loading ? 'bg-grey-400' : 'bg-green'
      } pa-2`"
      @click="!loading && searchPokemon()"
    >
      Search
    </button>
  </div>
</template>
<script>
import { app } from "../stores/storeApp";
import { mapActions, mapState } from "pinia";

export default {
  name: "ComponentSearch",
  data: () => ({
    name: null,
  }),
  computed: {
    ...mapState(app, ["loading"]),
  },
  methods: {
    ...mapActions(app, ["listPokemon", "reset", "search"]),

    async searchPokemon() {
      if (this.name) await this.search(this.name.toLowerCase(), "search");
      else this.listPokemon();
    },
  },
};
</script>
