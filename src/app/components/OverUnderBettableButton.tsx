import React from "react";
import {FSWideButton} from "./FSComponents";
import {OverUnder} from "../bets/betContext";
import {addBetToCart} from "../cart/cartActions";
import {Bettable, CartBet} from "../types";

interface Props {
    gamblerId: number;
    bettable: Bettable;
    overunder: OverUnder;
    cartBets: CartBet[];
}

const OverUnderBettableButton: React.FC<Props> = ({bettable, overunder, gamblerId, cartBets}) => {

    const bettableInCart = (bettableId: number, overunder: OverUnder) => {
        let cartBet = cartBets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overunder === overunder);
        return !!cartBet;
    };

    const betClick = () => {
        let bet = {bettableId: bettable.id, overunder: overunder};
        addBetToCart(gamblerId, bet);
    };

    if (!bettable.ouoff) {
        let disabled = bettableInCart(bettable.id, overunder);
        let overUnderName = overunder === 'OVER' ? "Over " : "Under ";
        return <FSWideButton className="hidden-xs hidden-sm" disabled={disabled}
                         onClick={betClick}>{overUnderName} {bettable.overunder}</FSWideButton>;
    } else {
        return <FSWideButton disabled={true}>O/U OFF</FSWideButton>;
    }

};

export default OverUnderBettableButton;
