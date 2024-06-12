import Kleerkast from "./Kleerkast.js";

export default class KleerkastRepository {
    #kleerkasten = [];
    #kleerkastenKey = 'kleerkasten';

    get kleerkasten() {
        return this.#kleerkasten;
    }

    get huidigeKleerkast() {
        return this.#kleerkasten[0];
    }

    voegKledingstukToeAanKleerkast(kledingstuk, kleerkast) {
        kleerkast.voegKledingstukToe(kledingstuk);
        this.#saveKleerkastenToStorage();
    }

    voegKleerkastToe(kast) {
        this.#kleerkasten.push(kast);
        this.#saveKleerkastenToStorage();
    }

    getKleerkast(naam) {
        return this.#kleerkasten.find(k => k.naam === naam);
    }

    set kleerkasten(arr) {
        this.#kleerkasten = arr;
    }

    #saveKleerkastenToStorage() {
        try {
            let kleerkastenJSON = [];
            this.#kleerkasten.forEach(kleerkast => {
                // Maak een JSON-object met de eigenschappen van de Kleerkast
                const kleerkastJSON = {
                    naam: kleerkast.naam,
                    locatie: kleerkast.locatie,
                    kledingstukken: kleerkast.kledingstukken
                };

                // Voeg het JSON-object toe aan een array van JSON-objecten
                kleerkastenJSON.push(kleerkastJSON);
            });

            // Zet de array van JSON-objecten om naar een JSON-string
            const kleerkastenJSONString = JSON.stringify(kleerkastenJSON);
            localStorage.setItem(this.#kleerkastenKey, JSON.stringify(kleerkastenJSONString));
        } catch (error) {
            console.error('Er is een fout opgetreden bij het opslaan van de kleerkasten in Local Storage:', error);
        }
    }
}