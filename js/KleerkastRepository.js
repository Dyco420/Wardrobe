import Kleerkast from "./Kleerkast.js";

export default class KleerkastRepository {
    #kleerkasten = [];

    get kleerkasten() {
        return this.#kleerkasten;
    }

    get huidigeKleerkast() {
        return this.#kleerkasten[0];
    }

    voegKleerkastToe(kast) {
        this.#kleerkasten.push(kast);
    }

    getKleerkast(naam) {
        return this.#kleerkasten.find(k => k.naam === naam);
    }
}