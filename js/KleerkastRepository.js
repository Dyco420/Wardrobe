import Kleerkast from "./Kleerkast.js";

export default class KleerkastRepository {
    #kleerkasten = [];
    #huidigeKleerkast;

    constructor() {
        this.#kleerkasten = [];
    }

    voegKleerkastToe(kleerkast) {
        this.#kleerkasten.push(kleerkast);
    }

    verwijderKleerkast(kleerkast) {
        const index = this.#kleerkasten.indexOf(kleerkast);
        if (index !== -1) {
            this.#kleerkasten.splice(index, 1);
        }
    }

    get kleerkasten() {
        return this.#kleerkasten;
    }

    get huidigeKleerkast() {
        return this.#huidigeKleerkast;
    }

    set huidigeKleerkast(kleerkast){
        this.#huidigeKleerkast = kleerkast;
    }

    transferKledingstuk(kledingstuk, beginKast, eindKast) {
        const indexBegin = this.#kleerkasten.findIndex(k => k === beginKast);
        const indexEind = this.#kleerkasten.findIndex(k => k === eindKast);

        if (indexBegin === -1 || indexEind === -1) {
            console.log("Begin- of eindkleerkast niet gevonden.");
            return;
        }

        if (!beginKast.kledingstukken.includes(kledingstuk)) {
            console.log("Kledingstuk niet gevonden in begin kleerkast.");
            return;
        }

        beginKast.kledingstukken.splice(beginKast.kledingstukken.indexOf(kledingstuk), 1);
        eindKast.kledingstukken.push(kledingstuk);
    }

    filterKledij(huidigeKleerkast, criteria) {
        // Zoek de huidig weergegeven kleerkast in de repository
        const kleerkast = this.#kleerkasten.find(k => k === huidigeKleerkast);

        // Als de huidig weergegeven kleerkast niet wordt gevonden, retourneer een lege lijst
        if (!kleerkast) {
            console.log("Huidig weergegeven kleerkast niet gevonden.");
            return [];
        }

        // Filter de kledij van de huidig weergegeven kleerkast op basis van de criteria
        return kleerkast.kledingstukken.filter(kledingstuk => {
            return Object.entries(criteria).every(([key, value]) => {
                if (key === "naam" || key === "type" || key === "kleur" || key === "maat" || key === "merk") {
                    return kledingstuk[key] === value;
                }
                return true;
            });
        });
    }
}