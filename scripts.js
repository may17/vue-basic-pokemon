Vue.createApp({
  data() {
    return {
      pokemons: [
        {
          name: "Pikachu",
          type: "electro",
          hp: 35,
          weight: 150,
          height: 4,
          visibleDetails: false,
        },
        {
          name: "Joe",
          type: "electro",
          hp: 50,
          weight: 180,
          height: 80,
          visibleDetails: false,
        },
      ],
    };
  },
  methods: {
    showDetails(index) {
      this.pokemons[index].visibleDetails =
        !this.pokemons[index].visibleDetails;
    },
  },
}).mount("#app");
