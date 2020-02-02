import React, {Component, useEffect} from "react";
import {FSButton, FSWideButton} from "./FSComponents";
import {State} from "./GamesPage";
import {Bettable} from "../bettables/bettableReducer";
import {getCartBets} from "../cart/cartSelector";
import {connect, useDispatch, useSelector} from "react-redux";
import {CartBet} from "../cart/cartReducer";
import {OverUnder} from "../bets/betReducer";
import {addBetToCart} from "../cart/cartActions";

interface Props {
    gamblerId: number;
    bettable: Bettable;
    overunder: OverUnder;
}

const OverUnderBettableButton: React.FC<Props> = ({bettable, overunder, gamblerId}) => {

    const dispatch = useDispatch();
    const cartBets = useSelector(getCartBets);

    const bettableInCart = (bettableId: number, overunder: OverUnder) => {
        let cartBet = cartBets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overunder === overunder);
        return !!cartBet;
    };

    const betClick = () => {
        let bet = {bettableId: bettable.id, overunder: overunder};
        dispatch(addBetToCart(gamblerId, bet));
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
