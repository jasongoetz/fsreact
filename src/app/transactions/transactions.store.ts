import {action, observable} from "mobx";

class TransactionsStore {
    @observable transactionsByGambler: any = {}; //FIXME

    @action
    addGamblerTransactions = (gamblerId: number, transactions: any) => {
        transactionsStore.transactionsByGambler[gamblerId] = transactions;
    }
}

export const transactionsStore = new TransactionsStore();
