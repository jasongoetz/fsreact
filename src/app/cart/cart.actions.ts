import {cartStore} from "./cart.store";
import {gamblerStore} from "../gambler/gambler.store";
import {PotentialBet} from "../types";
import LocalCart from "./cart";
import {makeBets} from "../api/api";

const getGamblerId = (): number => gamblerStore.gambler!.id;

export const loadCart = async () => {
    const cart = LocalCart.loadCart(getGamblerId());
    await cartStore.loadCart(cart.bets, cart.parlay);
};

export const addBetToCart = async (bet: PotentialBet) => {
    const cartBet = await LocalCart.addCartBet(bet);
    if (cartBet) {
        await cartStore.addBetToCart(cartBet);
    }
};

export const editCartBet = async (cartBetId: string, amount: number) => {
    if (!!amount && isNaN(amount)) {
        return;
    }
    await LocalCart.editCartAmount(cartBetId, isNaN(amount) ? 0 : amount);
    await cartStore.editCartBet(cartBetId, amount);
};

export const removeCartBet = async (cartBetId: string) => {
    await LocalCart.removeFromCart(cartBetId);
    await cartStore.removeCartBet(cartBetId)
};

export const toggleParlay = async (active: boolean) => {
    await LocalCart.editParlayActive(active);
    await cartStore.toggleParlay(active);
};

export const editCartParlay = async (amount: number) => {
    if (!!amount && isNaN(amount)) {
        return true;
    }
    if (isNaN(amount)) {
        return;
    }
    await LocalCart.editParlayAmount(amount);
    await cartStore.editCartParlay(amount);
};

export const confirmBets = async () => {
    await makeBets(getGamblerId(), cartStore.bets, cartStore.parlay);
    await LocalCart.clearCart();
    cartStore.clearCart();
};
