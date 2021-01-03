import {action, observable} from "mobx";
import {Bet, BetOrParlayWrapper, Parlay} from "../types";

interface ParlayWithTally extends Parlay {
    tally: number;
}

interface BetWithTally extends Bet {
    tally: number;
}

type ParlayOrBet = ParlayWithTally | BetWithTally;

class TransactionsStore {
    @observable transactionsByGambler: { [gamblerId: number]: BetOrParlayWrapper[]  } = {};

    @action
    addGamblerTransactions = (gamblerId: number, transactions: BetOrParlayWrapper[]) => {
        transactionsStore.transactionsByGambler[gamblerId] = transactions;
    }
}

export const transactionsStore = new TransactionsStore();
