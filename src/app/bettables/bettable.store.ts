import {Bettable} from "../types";
import {action, observable} from "mobx";

class BettableStore {
    @observable bettables: Bettable[] = []
    loaded: boolean = false

    @action
    saveBettables = async (bettables: Bettable[]) => {
        this.bettables = bettables;
        this.loaded = true;
    };

    @action
    clear = () => {
        this.bettables = [];
        this.loaded = false;
    }
}

export const bettableStore = new BettableStore()
