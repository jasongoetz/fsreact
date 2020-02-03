import React from "react";
import {FSWideButton} from "./FSComponents";
import {addBetToCart} from "../cart/cartActions";
import {Bettable, CartBet} from "../types";

interface Props {
    gamblerId: number;
    bettable: Bettable;
    team: number; //TODO: Replace this with an enum
    cartBets: CartBet[];
}

const TeamBettableButton: React.FC<Props> = ({gamblerId, bettable, team, cartBets}) => {

    const bettableInCart = (bettableId: number, sideId: string) => {
        let cartBet = cartBets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.sideId === sideId);
        return !!cartBet;
    };

    const getSpread = () => {
        let spreadPropName = team == 1 ? 'team1Spread' : 'team2Spread';
        return bettable[spreadPropName];
    };

    const getSideId = () => {
        let sideIdName = team == 1 ? 'sideId1' : 'sideId2';
        return bettable[sideIdName];
    };

    const betClick = () => {
        let bet = {
            bettableId: bettable.id,
            sideId: getSideId()
        };
        addBetToCart(gamblerId, bet);
    };

    if (!bettable.off) {
        let spread = getSpread();
        let sideId = getSideId();
        let disabled = bettableInCart(bettable.id, sideId);
        return <FSWideButton disabled={disabled} onClick={betClick}>{spread}</FSWideButton>;
    } else {
        return <FSWideButton disabled={true}>OFF</FSWideButton>;
    }
};

export default TeamBettableButton;
