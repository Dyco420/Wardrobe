import Kledingstuk from "./Kledingstuk.js";

export default class Kleerkast {
    #naam;
    #locatie;
    #kledingstukken = [];

    constructor(naam, locatie){
        this.#naam = naam;
        this.#locatie = locatie;
    }

    voegKledingstukToe(kledingstuk){
        this.#kledingstukken.push(kledingstuk);
    }

    voegKledingstukkenToe(stukken){
        for (let stuk of stukken){
            this.voegKledingstukToe(stuk);
        }
    }

    verwijderKledingstuk(stuk){
        const index = this.#kledingstukken.indexOf(stuk);
        if (index !== -1) {
            this.#kledingstukken.splice(index, 1);
        }
    }

    get naam() {
        return this.#naam;
    }

    get kledingstukken() {
        return this.#kledingstukken;
    }

    get locatie() {
        return this.#locatie;
    }

    set locatie(locatie) {
        this.#locatie = locatie;
    }
    
    setLocatie(straat, huisnummer, stad, postcode, land){
        this.#locatie = `${straat} ${huisnummer}, ${postcode} ${stad}, ${land}`;
    }
}