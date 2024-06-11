import KleerkastRepository from "./KleerkastRepository.js";

export default class KleerkastApp{
    #repository;

    constructor(){
        this.#repository = new KleerkastRepository();
    }
}