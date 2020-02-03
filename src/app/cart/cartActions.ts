import {
    createCartBet,
    editCartAmount,
    editParlayAmount,
    getGamblerBetCart,
    makeBets,
    removeFromCart,
    toggleParlayOnGamblerBetCart
} from "../api/api";
import {CartContext, mutate} from "./cartContext";

export const loadCart = async (gamblerId: number) => {
    const cart = await getGamblerBetCart(gamblerId);
    mutate((draft: CartContext) => {
        draft.bets = cart.bets;
        draft.parlay = cart.parlay;
    });
};

export const addBetToCart = async (gamblerId: number, bet) => {
    const cartBet = await createCartBet(gamblerId, bet);
    if (cartBet) {
        mutate((draft: CartContext) => {
            draft.bets.push(cartBet);
        });
    }
};

export const editCartBet = async (gamblerId: number, cartId: number, amount: number) => {
    if (isNaN(amount)) {
        return;
    }
    await editCartAmount(gamblerId, cartId, amount);
    mutate((draft: CartContext) => {
        draft.bets = draft.bets.map(bet => (bet.id === cartId) ? {...bet, amount: amount} : bet);
    });
};

export const removeCartBet = async (gamblerId: number, cartId: number) => {
    await removeFromCart(gamblerId, cartId);
    mutate((draft: CartContext) => {
        draft.bets = draft.bets.filter(bet => (bet.id !== cartId));
        if (draft.parlay) {
            draft.parlay.active = draft.parlay && draft.parlay.active && draft.bets.length > 1;
        }
    });
};

export const toggleParlay = async (gamblerId: number, active: boolean) => {
    await toggleParlayOnGamblerBetCart(gamblerId, active);
    mutate((draft: CartContext) => {
        if (draft.parlay) {
            draft.parlay.active = active;
        }
    });
};

export const editCartParlay = async (gamblerId: number, amount: number) => {
    if (isNaN(amount)) {
        return;
    }
    await editParlayAmount(gamblerId, amount);
    mutate((draft: CartContext) => {
        if (draft.parlay) {
            draft.parlay.amount = amount;
        }
    })
};

export const confirmBets = async (gamblerId: number) => {
    await makeBets(gamblerId);
    mutate((draft: CartContext) => {
        draft.bets = [];
        draft.parlay = undefined;
    });
};
