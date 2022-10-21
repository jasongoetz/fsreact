import React from "react";
import { FSWideButton, OffButton } from "./FSComponents";
import {Bettable} from "../types";
import {useGlobalStores} from "../context/global_context";
import {addBetToCart} from "../cart/cart.actions";
import {observer} from "mobx-react";

export type Team = 'TEAM1' | 'TEAM2';

interface Props {
    bettable: Bettable;
    team: Team;
}

const TeamBettableButton: React.FC<Props> = observer(({bettable, team, ...props}) => {

    const { cartStore } = useGlobalStores();

    const bettableInCart = (bettableId: number, sideId: string) => {
        let cartBet = cartStore.bets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.sideId === sideId && !cartBet.moneyline);
        return !!cartBet;
    };

    const getSpread = () => {
        let spreadPropName = team === 'TEAM1' ? 'team1Spread' : 'team2Spread';
        return bettable[spreadPropName];
    };

    const getSideId = () => {
        let sideIdName = team === 'TEAM1' ? 'sideId1' : 'sideId2';
        return bettable[sideIdName];
    };

    const betClick = () => {
        let bet = {
            bettable: bettable,
            sideId: getSideId(),
            moneyline: false,
        };
        addBetToCart(bet);
    };

    const spread = getSpread();
    if (!bettable.off && spread && !isNaN(spread)) {
        let sideId = getSideId();
        let disabled = bettableInCart(bettable.id, sideId);
        return <FSWideButton disabled={disabled} onClick={betClick} {...props}>{spread}</FSWideButton>;
    } else {
        return <OffButton disabled={true}>OFF</OffButton>;
    }
});

export default TeamBettableButton;
