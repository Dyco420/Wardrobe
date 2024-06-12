export default class Kledingstuk {
    #naam;
    #type;
    #kleur;
    #maat;
    #merk;
    #kleerkast;
    #afbeeldingen;

    constructor(naam, type, kleur, maat, merk, kleerkast, afbeeldingen){
        this.#naam = naam;
        this.#type = type;
        this.#kleur = kleur;
        this.#maat = maat;
        this.#merk = merk;
        this.#kleerkast = kleerkast;
        this.#afbeeldingen = afbeeldingen || [];
    }

    get naam() {
        return this.#naam;
    }

    set naam(value) {
        this.#naam = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get kleur() {
        return this.#kleur;
    }

    set kleur(value) {
        this.#kleur = value;
    }

    get maat() {
        return this.#maat;
    }

    set maat(value) {
        this.#maat = value;
    }

    get merk() {
        return this.#merk;
    }

    set merk(value) {
        this.#merk = value;
    }

    get kleerkast() {
        return this.#kleerkast;
    }

    set kleerkast(value) {
        this.#kleerkast = value;
    }

    get afbeeldingen() {
        return this.#afbeeldingen;
    }

    voegAfbeeldingToe(afbeelding) {
        this.#afbeeldingen.push(afbeelding);
    }

    verwijderAfbeelding(afbeelding) {
        const index = this.#afbeeldingen.indexOf(afbeelding);
        if (index !== -1) {
            this.#afbeeldingen.splice(index, 1);
        }
    }

    geefAfbeelding(index){
        if (index < 0 || index >= this.#afbeeldingen.length) {
            return "no_image_found.jpg";
        } else {
            return this.#afbeeldingen[index];
        }
    }
}