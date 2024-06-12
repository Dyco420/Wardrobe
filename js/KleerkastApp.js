import KleerkastRepository from "./KleerkastRepository.js";

export default class KleerkastApp{
    #repository;

    constructor(){
        this.#repository = new KleerkastRepository();
    }

    transferKledingstuk(kledingstuk, beginKast, eindKast) {
        this.#repository.transferKledingstuk(kledingstuk, beginKast, eindKast);
        this.#initialiseerHTML();
    }

    filterKledij(criteria) {
        return this.#repository.filterKledij(criteria);
    }

    transferKledingstukken(lijst, beginKast, eindKast){
        for (let kledingstuk of lijst){
            this.transferKledingstuk(kledingstuk, beginKast, eindKast);
        }
    }

    #initialiseerHTML() {
        this.#toonKledingCards();
    }

    #toonKledingCards() {
        let kledij = this.#repository.huidigeKleerkast.kledingstukken;
        let container = document.getElementById("kleding-container");

        
    }
}