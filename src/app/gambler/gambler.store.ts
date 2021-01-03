import {action, observable} from "mobx";
import {Gambler} from "../types";

class GamblerStore {
    @observable gambler?: Gambler;

    @action
    saveGambler = (gambler: Gambler) => {
        this.gambler = gambler;
    }
}

export const gamblerStore = new GamblerStore();
