import {action, observable} from "mobx";
import {Gambler} from "../types";

class GamblerStore {
    @observable gambler?: Gambler;

    @action
    saveGambler = (gambler: Gambler) => {
        this.gambler = gambler;
    }

    @action
    clear = () => {
        this.gambler = undefined;
    }
}

export const gamblerStore = new GamblerStore();
