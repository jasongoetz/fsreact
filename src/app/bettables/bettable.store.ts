import {Bettable} from "../types";
import {action, observable} from "mobx";

class BettableStore {
    @observable bettables: Bettable[] = []

    @action
    saveBettables = async (bettables: Bettable[]) => {
        this.bettables = bettables;
    };
}

export const bettableStore = new BettableStore()
