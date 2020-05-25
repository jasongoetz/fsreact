import {action, observable} from "mobx";

class BetStore {
    @observable betsAndParlaysByGambler: any = {} //TODO: Fix 'any' type

    @action
    saveBets = async (bets) => {
        this.betsAndParlaysByGambler = bets
    };
}

export const betStore = new BetStore();
