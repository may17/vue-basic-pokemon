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
      // Enable a case insensitive search
      return this.pokemons.filter((pokemon) =>
        pokemon.name.startsWith(this.searchQuery.toLowerCase())
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
    /**
     * Get a list of pokemons. By default the api will return 20 items.
     * The api will only return the pokemon name and a extra api endpoint
     * to collect details about the pokemon.
     */
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const jsonData = await response.json();

    /**
     * To get the details we need to collect a bunch of pokemon fetch requests.
     * We will store them into this array to solve them all together with a Promise.all()
     */
    const detailsPromises = [];

    /**
     * We use a for of (cause it supports async operations .forEach will not)
     * to fetch the result of each detail url.
     *
     * Cause the nature of fetch is to resolve a json response with a promise,
     * we collect this promise into our array.
     */
    for (result of jsonData.results) {
      const response = await fetch(result.url);
      detailsPromises.push(response.json());
    }

    /**
     * We use Promise.all() to wait until all promises into our array
     * are resolved. Then we grab only the details we need and store them into our
     * this.pokemons state.
     */
    Promise.all(detailsPromises).then((pokemonDetails) => {
      this.pokemons = pokemonDetails.map((pokemonDetail) => {
        return {
          name: pokemonDetail.name,
          type: pokemonDetail.types[0].type.name,
          imgSrc: pokemonDetail.sprites.front_default,
          hp: pokemonDetail.stats[0].base_stat,
          height: pokemonDetail.height,
          weight: pokemonDetail.weight,
          visibleDetails: false,
        };
      });
    });
  },
}).mount("#app");
