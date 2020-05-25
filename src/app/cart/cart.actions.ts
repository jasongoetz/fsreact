import {
    createCartBet,
    editCartAmount,
    editParlayAmount,
    getGamblerBetCart,
    makeBets,
    removeFromCart,
    toggleParlayOnGamblerBetCart
} from "../api/api";
import {cartStore} from "./cart.store";
import {gamblerStore} from "../gambler/gambler.store";

const getGamblerId = (): number => gamblerStore.gambler!.id;

export const loadCart = async () => {
    const cart = await getGamblerBetCart(getGamblerId());
    cartStore.loadCart(cart.bets, cart.parlay);
};

export const addBetToCart = async bet => {
    const cartBet = await createCartBet(getGamblerId(), bet);
    if (cartBet) {
        cartStore.addBetToCart(cartBet);
    }
};

export const editCartBet = async (cartBetId: number, amount: number) => {
    if (isNaN(amount)) {
        return;
    }
    await editCartAmount(getGamblerId(), cartBetId, amount);
    cartStore.editCartBet(cartBetId, amount);
};

export const removeCartBet = async (cartBetId: number) => {
    await removeFromCart(getGamblerId(), cartBetId);
    cartStore.removeCartBet(cartBetId)
};

export const toggleParlay = async (active: boolean) => {
    await toggleParlayOnGamblerBetCart(getGamblerId(), active);
    cartStore.toggleParlay(active);
};

export const editCartParlay = async (amount: number) => {
    if (isNaN(amount)) {
        return;
    }
    await editParlayAmount(getGamblerId(), amount);
    cartStore.editCartParlay(amount);
};

export const confirmBets = async () => {
    await makeBets(getGamblerId());
    cartStore.clearCart();
};
