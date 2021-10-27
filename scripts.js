Vue.createApp({
  data() {
    return {
      searchQuery: "",
      pokemons: [],
    };
  },
  computed: {
    pokemonCount() {
      return this.pokemonFilteredList.length;
    },
    pokemonFilteredList() {
      return this.pokemons.filter((pokemon) =>
        pokemon.name.startsWith(this.searchQuery)
      );
    },
  },
  methods: {
    filterItems() {
      this.isFilterActive = true;
    },
    showDetails(index) {
      this.pokemons[index].visibleDetails =
        !this.pokemons[index].visibleDetails;
    },
    detailsButtonText(index) {
      return this.pokemons[index].visibleDetails
        ? "Hide Details"
        : "Show Details";
    },
  },
  async created() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const jsonData = await response.json();

    this.pokemons = jsonData.results;
  },
}).mount("#app");
