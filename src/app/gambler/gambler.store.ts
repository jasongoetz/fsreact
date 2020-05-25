import {action, observable} from "mobx";
import {Gambler} from "../types";

class GamblerStore {
    @observable gambler?: any = {};

    @action
    saveGambler = (gambler: Gambler) => {
        this.gambler = gambler;
    }
}

export const gamblerStore = new GamblerStore();
