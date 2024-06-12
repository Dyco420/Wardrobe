import Kledingstuk from "./Kledingstuk.js";

export default class Kleerkast {
    #naam;
    #locatie;
    #kledingstukken = [];

    constructor(naam){
        this.#naam = naam;
    }

    voegKledingstukToe(naam, type, kleur, maat, merk, afbeeldingen = []){
        const kledingstuk = new Kledingstuk(
            naam,
            type,
            kleur,
            maat,
            merk,
            this, // Verwijzing naar de huidige kleerkast
            afbeeldingen
        );
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

    get kledingstukken() {
        return this.#kledingstukken;
    }
}