export default class KleerkastLocatie{
    #naam;
    #straat;
    #huisnummer;
    #stad;
    #postcode;
    #land;

    constructor(naam, straat, huisnummer, stad, postcode, land){
        this.#naam = naam;
        this.#straat = straat;
        this.#huisnummer = huisnummer;
        this.#stad = stad;
        this.#land = land;
    }

    get naam() {
        return this.#naam;
    }

    get straat() {
        return this.#straat;
    }

    get huisnummer() {
        return this.#huisnummer;
    }

    get stad() {
        return this.#stad;
    }

    get postcode() {
        return this.#postcode;
    }

    get land() {
        return this.#land;
    }

    // Getter voor volledig adres
    get volledigAdres() {
        return `${this.#straat} ${this.#huisnummer}, ${this.#postcode} ${this.#stad}, ${this.#land}`;
    }
}