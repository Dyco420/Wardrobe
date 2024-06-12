import Kledingstuk from "./Kledingstuk.js";

export default class Kleerkast {
    #naam;
    #locatie;
    #kledingstukken;

    constructor(kledingstukken = []){
        this.#kledingstukken = kledingstukken;
    }

    voegKledingstukToe(stuk){
        this.#kledingstukken.push(stuk);
    }

    voegKledingstukkenToe(stukken){
        for (let stuk of stukken){
            this.voegKledingstukToe(stuk);
        }
    }

    verwijderKledingstuk(stuk){
        const index = this.#kledingstukken.indexOf(kleerkast);
        if (index !== -1) {
            this.#kledingstukken.splice(index, 1);
        }
    }

    get kledingstukken() {
        return this.#kledingstukken;
    }
}