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
                    visibleDetails: false
                },
                {
                    name: "Joe",
                    type: "electro",
                    hp: 50,
                    weight: 180,
                    height: 80,
                    visibleDetails: false
                }
            ]
        }
    },
    methods: {
        showDetails(index) {
            /* 
            // Alternative solution 1
            if (this.visibleDetails) {
                this.visibleDetails = false
            } else {
                this.visibleDetails = true
            }
            
            // Alternative solution 2
            this.visibleDetails = this.visibleDetails
                ? false
                : true
            */
            
            // smartes solution
            this.pokemons[index].visibleDetails = !this.pokemons[index].visibleDetails
        }
    }
}).mount("#app")