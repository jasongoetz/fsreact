import createState from 'react-copy-write';
import {CartBet, CartParlay} from "../types";
import {BettableContext} from "../bettables/bettableContext";

export type CartContext = {
    bets: CartBet[],
    parlay?: CartParlay,
};

const initialState: CartContext = {
    bets: [],
};

const {
    Provider,
    Consumer,
    mutate,
} = createState<BettableContext>(initialState);

export { Provider as CartProvider, Consumer as CartConsumer, mutate }
