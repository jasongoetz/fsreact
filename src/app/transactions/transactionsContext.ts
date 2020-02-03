import createState from 'react-copy-write';

export interface TransactionsContext {
    transactionsByGambler: any; //FIXME
}

const initialState: TransactionsContext = {
    transactionsByGambler: {},
};

const {
    Provider,
    Consumer,
    mutate,
} = createState<TransactionsContext>(initialState);

export { Provider as TransactionsProvider, Consumer as TransactionsConsumer, mutate }
