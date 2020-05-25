import {action, observable} from "mobx";
import {Bet, Parlay} from "../types";

export interface GamblerBets {
    [gamblerId: number]: {bets: Bet[], parlays: Parlay[]}
}

class BetStore {
    @observable betsAndParlaysByGambler: GamblerBets = {}

    @action
    saveBets = async (bets: GamblerBets) => {
        this.betsAndParlaysByGambler = bets
    };
}

export const betStore = new BetStore();
