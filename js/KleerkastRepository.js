import Kleerkast from "./Kleerkast.js";

export default class KleerkastRepository {
    #kleerkasten = [];
    #huidigeKleerkast;

    constructor() {
        //TODO
    }

    get huidigeKleerkast() {
        return this.#huidigeKleerkast;
    }

    voegKleerkastToe(kast) {
        this.#kleerkasten.push(kast);
        this.#huidigeKleerkast = kast;
    }
}