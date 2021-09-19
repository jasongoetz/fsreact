import {Bettable, Cart, CartBet, PotentialBet} from "../types";

class LocalCart {
    private cart: Cart;
    private currentGamblerId?: number;

    constructor() {
        this.cart = {bets: [], parlay: {active: false, amount: 0}}
    }

    public loadCart = (gamblerId: number): Cart => {
        this.currentGamblerId = gamblerId;
        const cartString = localStorage.getItem("cart-" + gamblerId);
        if (cartString) {
            this.cart = JSON.parse(cartString);
        }

        const now = Date.now();
        this.cart.bets = this.cart.bets.filter(bet => Date.parse(bet.bettable.gameTime) > now);

        this.saveCart();

        return this.cart;
    }

    public storeCart = () => {
        this.saveCart();
    }

    private saveCart = () => {
        localStorage.setItem("cart-" + this.currentGamblerId, JSON.stringify(this.cart));
    }

    public addCartBet = (bet: PotentialBet): CartBet | undefined => {
        if (this.betIsInCart(bet)) {
            return;
        }
        let cartBet: CartBet = {
            id: this.toCartBetId(bet),
            bettable: bet.bettable,
            sideId: bet.sideId,
            overunder: bet.overunder,
            line: this.getLine(bet.bettable, bet.sideId),
            amount: 0,
        };
        this.cart.bets.push(cartBet);
        this.saveCart();
        return cartBet;
    }

    public editCartAmount = (cartBetId: string, amount: number) => {
        const cartBet = this.cart.bets.find(cb => cb.id === cartBetId);
        if (cartBet) {
            cartBet.amount = amount;
        }
        this.saveCart();
    };

    public removeFromCart = (cartBetId: string) => {
        this.cart.bets = this.cart.bets.filter(cb => cb.id !== cartBetId);
        this.cart.parlay.active = this.cart.parlay && this.cart.parlay.active && this.cart.bets.length > 1;
        this.saveCart();
    }

    public editParlayActive = (active: boolean) => {
        this.cart.parlay.active = active;
        this.saveCart();
    }

    public editParlayAmount = (amount: number) => {
        this.cart.parlay.amount = amount;
        this.saveCart();
    }

    public clearCart = () => {
        this.cart = {bets: [], parlay: {active: false, amount: 0}};
        this.saveCart();
    }

    private betIsInCart = (bet: PotentialBet) => {
        return this.cart.bets.some(cb => cb.id === this.toCartBetId(bet));
    }

    private toCartBetId = (bet: PotentialBet) => `${(bet.bettable.id)}-${(bet.sideId)}-${(bet.overunder)}`;

    private getLine = (bettable: Bettable, sideId?: string) => {
        if (sideId === bettable.sideId1) {
            return bettable.team1Spread;
        }
        else if (sideId === bettable.sideId2) {
            return bettable.team2Spread;
        }
        else {
            return bettable.overunder;
        }
    }
}

export default new LocalCart();
