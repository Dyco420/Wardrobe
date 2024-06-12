import KleerkastRepository from "./KleerkastRepository.js";
import Kleerkast from "./Kleerkast.js";

export default class KleerkastApp{
    #repository;

    constructor(){
        this.#repository = new KleerkastRepository();
        this.#initialiseerHTML();
    }

    transferKledingstuk(kledingstuk, beginKast, eindKast) {
        this.#repository.transferKledingstuk(kledingstuk, beginKast, eindKast);
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
        console.log(this.#repository.huidigeKleerkast);
        let kledij = this.#repository.huidigeKleerkast.kledingstukken;
        let container = document.getElementById("kleding-container");

        kledij.forEach(kledingstuk => {
            // Maak een nieuwe div aan voor de kaart
            let card = document.createElement("div");
            card.classList.add("card");
    
            // Maak de eerste zijde van de kaart aan
            let face1 = document.createElement("div");
            face1.classList.add("face", "face1");
    
            // Voeg de content toe aan de eerste zijde van de kaart
            let content1 = document.createElement("div");
            content1.classList.add("content");
    
            // Voeg de afbeelding toe aan de content
            let img = document.createElement("img");
            img.src = kledingstuk.afbeeldingen[0];
            img.alt = "Kledingstuk image";
            content1.appendChild(img);
    
            // Voeg de naam van het kledingstuk toe aan de content
            let h3 = document.createElement("h3");
            h3.textContent = kledingstuk.naam;
            content1.appendChild(h3);
    
            // Voeg de content toe aan de eerste zijde van de kaart
            face1.appendChild(content1);
    
            // Maak de tweede zijde van de kaart aan
            let face2 = document.createElement("div");
            face2.classList.add("face", "face2");
    
            // Voeg de content toe aan de tweede zijde van de kaart
            let content2 = document.createElement("div");
            content2.classList.add("content");
    
            // Voeg de details van het kledingstuk toe aan de content
            let type = document.createElement("h3");
            type.textContent = `Type: ${kledingstuk.type}`;
            content2.appendChild(type);
    
            let kleur = document.createElement("p");
            kleur.textContent = `Kleur: ${kledingstuk.kleur}`;
            content2.appendChild(kleur);
    
            let maat = document.createElement("p");
            maat.textContent = `Maat: ${kledingstuk.maat}`;
            content2.appendChild(maat);
    
            let merk = document.createElement("p");
            merk.textContent = `Merk: ${kledingstuk.merk}`;
            content2.appendChild(merk);
    
            // Voeg de content toe aan de tweede zijde van de kaart
            face2.appendChild(content2);
    
            // Voeg beide zijden van de kaart toe aan de kaart
            card.appendChild(face1);
            card.appendChild(face2);
    
            // Voeg de kaart toe aan de container
            container.appendChild(card);
        });
    }

    async haalTestDataOp() {
        try {
            const response = await fetch("./data/testKledij.json");
    
            if (!response.ok) {
                throw new Error("Geen data gevonden");
            }

            const data = await response.json();
    
            // Creëer een nieuwe kleerkast om de kledingstukken aan toe te voegen
            const testKleerkast = new Kleerkast("Test Kleerkast");
    
            data.forEach((item) => {
                testKleerkast.voegKledingstukToe(item.naam,
                    item.type,
                    item.kleur,
                    item.maat,
                    item.merk,
                    testKleerkast,
                    item.afbeeldingen);
            });
    
            this.#repository.voegTestKleerkastToe(testKleerkast);
        } catch (error) {
            console.error("Er is een fout opgetreden bij het ophalen van de testkledij:", error);
            return null;
        }
    }
}