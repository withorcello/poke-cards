import { defineStore } from "pinia";
import axios from "axios";

export const app = defineStore("app", {
  state: () => ({
    cols: "1",
    evolutions: [],
    loading: false,
    pagination: {
      next: null,
      previous: null,
    },
    pokemon: {},
    registros: [],
    total: 0,
  }),
  actions: {
    async listPokemon(param) {
      try {
        this.loading = true;

        let query;
        if (param === "next") query = this.pagination.next;
        else if (param === "previous") query = this.pagination.previous;
        else query = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=28";

        this.reset();
        const res = await axios.get(query);

        if (res.data && !res.data.error) {
          this.pagination = {
            next: res.data.next,
            previous: res.data.previous,
          };

          this.total = res.data.count;
          const list = res.data.results;
          for (const item of list) {
            const { data } = await axios.get(item.url);

            this.registros.push({
              id: data.id,
              img: data.sprites["front_default"],
              name: data.name,
              stats: data.stats.map((el) => {
                return {
                  text: el.stat.name,
                  value: el.base_stat,
                };
              }),
            });
          }
        }

        setTimeout(() => {}, 1000);

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async listEvolution(evolution) {
      this.loading = true;

      await this.findPokemon(evolution.species.name, "evolutions");

      if (evolution["evolves_to"] && evolution["evolves_to"].length) {
        this.listEvolution(evolution["evolves_to"][0]);
      }

      this.loading = false;
    },
    async findPokemon(params, type) {
      try {
        this.loading = true;

        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params}`
        );

        if (res.data && !res.data.error) {
          const registro = {
            id: res.data.id,
            img: res.data.sprites["front_default"],
            name: res.data.name,
            stats: res.data.stats.map((el) => {
              return {
                text: el.stat.name,
                value: el.base_stat,
              };
            }),
          };
          if (type === "search") this.pokemon = registro;
          else if (type === "evolutions") this.evolutions.push(registro);

          return res.data.id;
        }

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async findSpecie(id) {
      try {
        const specie = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}/`
        );
        if (specie.data) {
          const evolutions = await axios.get(
            specie.data["evolution_chain"].url
          );

          this.reset();
          await this.listEvolution(evolutions.data.chain);
        }
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      this.evolutions = [];
      this.pokemon = [];
      this.registros = [];
    },
    setColsCard(cols) {
      this.cols = cols;
    },
  },
});
