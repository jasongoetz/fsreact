import {BettableWithScore} from "../types";
import {action, observable} from "mobx";

class AdminStore {
    @observable gamesWithOpenBets: BettableWithScore[] = []
    loaded: boolean = false

    @action
    saveGamesWithOpenBets = async (bettables: BettableWithScore[]) => {
        this.gamesWithOpenBets = bettables;
        this.loaded = true;
    };
}

export const adminStore = new AdminStore()
