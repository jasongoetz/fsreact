import {CartBet, CartParlay} from "../types";
import {action, observable} from "mobx";

class CartStore {
    @observable bets: CartBet[] = [];
    @observable parlay?: CartParlay;

    @action
    loadCart = async (bets: CartBet[], parlay?: CartParlay) => {
        this.bets = bets;
        this.parlay = parlay;
    };

    @action
    addBetToCart = async (bet) => {
        this.bets.push(bet);
    };

    @action
    editCartBet = async (cartBetId: number, amount: number) => {
        this.bets = this.bets.map(bet => (bet.id === cartBetId) ? {...bet, amount: amount} : bet);
    };

    @action
    removeCartBet = async (cartBetId: number) => {
        this.bets = this.bets.filter(bet => (bet.id !== cartBetId));
        if (this.parlay) {
            this.parlay.active = this.parlay && this.parlay.active && this.bets.length > 1;
        }
    };

    @action
    toggleParlay = async (active: boolean) => {
        this.parlay = { amount: this.parlay?.amount || 0, active };
    };

    @action
    editCartParlay = async (amount: number) => {
        if (this.parlay) {
            this.parlay.amount = amount;
        }
    };

    @action
    clearCart = async () => {
        this.bets = [];
        this.parlay = undefined;
    };
}

export const cartStore = new CartStore();


