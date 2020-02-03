import createState from 'react-copy-write';
import {Bettable} from "../types";

export interface BettableContext {
    bettables: Bettable[];
}

const initialState = {
    bettables: []
};

const {
    Provider,
    Consumer,
    mutate,
} = createState<BettableContext>(initialState);

export { Provider as BettableProvider, Consumer as BettableConsumer, mutate }
