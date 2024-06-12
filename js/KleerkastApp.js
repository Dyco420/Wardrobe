import KleerkastRepository from "./KleerkastRepository.js";
import Kleerkast from "./Kleerkast.js";
import Kledingstuk from "./Kledingstuk.js";

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

    async #initialiseerData() {
        try {
            const kleerkastenData = localStorage.getItem('kleerkasten');
    
            if (!kleerkastenData) {
                throw new Error("Geen data gevonden in localStorage");
            }
    
            const kleerkastenString = JSON.parse(kleerkastenData);
            const kleerkasten = JSON.parse(kleerkastenString);

            this.#repository.kleerkasten = [];
    
            kleerkasten.forEach(kleerkastData => {
                const kleerkast = new Kleerkast(kleerkastData.naam, kleerkastData);
                kleerkastData.kledingstukken.forEach(kledingstukData => {
                    kleerkast.voegKledingstukToe(
                        kledingstukData.naam,
                        kledingstukData.type,
                        kledingstukData.kleur,
                        kledingstukData.maat,
                        kledingstukData.merk,
                        kledingstukData.afbeeldingen
                    );
                });
                this.#repository.voegKleerkastToe(kleerkast);
            });
        } catch (error) {
            console.error("Er is een fout opgetreden bij het ophalen van de kleerkasten:", error);
        }
    }

    async #initialiseerHTML() {
        await this.#initialiseerData();
        await this.haalTestDataOp();

        this.#updateKleerkastLijst();

        // Toon standaard alle kledingstukken
        this.#toonAlleKledingstukken();

        // Stel eventhandler in voor addKleerkast btn
        this.#initAddWardrobeModal();
        // Add kledingstuk
        this.#initAddKledingstukModal();

        console.log(this.#repository.kleerkasten);
    }

    #initAddWardrobeModal() {
        const addWardrobeBtn = document.getElementById("btnAddKleerkast");
        addWardrobeBtn.addEventListener("click", () => this.openModal("add-wardrobe-modal"));

        const wardrobeForm = document.getElementById("wardrobe-form");
        wardrobeForm.addEventListener("submit", (event) => this.handleWardrobeFormSubmit(event));

        const closeButton = document.getElementById("addWardrobeClose");
        closeButton.addEventListener("click", () => this.closeModal("add-wardrobe-modal"));
    }

    #initAddKledingstukModal() {
        const addKledingBtn = document.getElementById("btnAddKledingstuk");
        addKledingBtn.addEventListener("click", () => this.openModal("modalAddKledingstuk"));

        const kledingForm = document.getElementById("formAddKledingstuk");
        kledingForm.addEventListener("submit", (event) => this.handleKledingstukFormSubmit(event));

        const closeButton = document.getElementById("addKledingstukClose");
        closeButton.addEventListener("click", () => this.closeModal("modalAddKledingstuk"));
    }

    #updateKleerkastLijst() {
        let lijst = document.getElementById("kleerkastSelect");

        lijst.innerHTML = "<option>Selecteer een wardrobe</option>";
        
        // Voeg kleerkasten toe aan lijst
        this.#repository.kleerkasten.forEach(kleerkast => {
            let option = document.createElement("option");
            option.setAttribute("value",kleerkast.naam);
            option.innerText = kleerkast.naam;

            lijst.appendChild(option);
        })

        lijst.onchange = () => {
            if (lijst.value === "Selecteer een kleerkast") {
                this.#toonAlleKledingstukken();
            } else {
                let gekozenKleerkast = this.#repository.kleerkasten.find(k => k.naam === lijst.value);
                this.#toonKledingCards(gekozenKleerkast.kledingstukken);
            }
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    handleWardrobeFormSubmit(event) {
        event.preventDefault(); // Voorkom dat het formulier wordt verzonden

        // Haal de ingevoerde waarden op
        const name = document.getElementById("wardrobe-name").value;
        const location = document.getElementById("wardrobe-location").value;

        // Voeg hier logica toe om een nieuwe kleerkast toe te voegen met de ingevoerde gegevens
        const nieuweKleerkast = new Kleerkast(name, location);
        this.#repository.voegKleerkastToe(nieuweKleerkast);

        console.log("Kleerkast toegevoegd:");
        console.log(nieuweKleerkast);

        // Sluit het modale venster
        this.closeModal("add-wardrobe-modal");
        // Refresh lijst
        this.#updateKleerkastLijst()
    }

    handleKledingstukFormSubmit(event) {
        event.preventDefault(); // Voorkom dat het formulier wordt verzonden
    
        // Haal de ingevoerde waarden op
        const naam = document.getElementById("kledingstuk-naam").value;
        const type = document.getElementById("kledingstuk-type").value;
        const kleur = document.getElementById("kledingstuk-kleur").value;
        const maat = document.getElementById("kledingstuk-maat").value;
        const merk = document.getElementById("kledingstuk-merk").value;

        //TODO afbeeldingen opslaan in data + strings ervan meegeven in afbeeldingen
        const afbeeldingen = ["geel_tshirt_test.jpg"];

        const nieuwKledingstuk = new Kledingstuk(naam, type, kleur, maat, merk, afbeeldingen);

        this.#repository.voegKledingstukToeAanKleerkast(nieuwKledingstuk, this.#repository.kleerkasten.find(k => k.naam === document.getElementById("kleerkastSelect").value));

        // Sluit het modale venster
        this.closeModal("modalAddKledingstuk");

        this.#toonAlleKledingstukken();
    }

    #toonAlleKledingstukken() {
        let alleKledij = [];
        this.#repository.kleerkasten.forEach(k => {
            alleKledij.push(...k.kledingstukken);
        })

        this.#toonKledingCards(alleKledij);
    }

    #toonKledingCards(kledij) {
        let container = document.getElementById("kleding-container");

        // Leeg container
        container.innerHTML = "";

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
            console.log(kledingstuk);
            let path = `img/kledingTest/` + kledingstuk.geefAfbeelding(0);
            let img = document.createElement("img");
            img.src = path;
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

            //TODO card onclick => naar pagina over kledingstuk
    
            // Voeg de kaart toe aan de container
            container.appendChild(card);
        });
    }

    // Unused voorlopig
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
                testKleerkast.voegKledingstukToe(new Kledingstuk(item.naam,
                    item.type,
                    item.kleur,
                    item.maat,
                    item.merk,
                    testKleerkast,
                    item.afbeeldingen));
            });
    
            this.#repository.voegKleerkastToe(testKleerkast);
        } catch (error) {
            console.error("Er is een fout opgetreden bij het ophalen van de testkledij:", error);
            return null;
        }
    }
}