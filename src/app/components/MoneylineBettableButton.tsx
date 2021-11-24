import React from "react";
import {FSWideButton} from "./FSComponents";
import {Bettable} from "../types";
import {useGlobalStores} from "../context/global_context";
import {addBetToCart} from "../cart/cart.actions";
import {observer} from "mobx-react";

export type Team = 'TEAM1' | 'TEAM2';

interface Props {
    bettable: Bettable;
    team: Team;
}

const MoneylineBettableButton: React.FC<Props> = observer(({bettable, team}) => {

    const { cartStore } = useGlobalStores();

    const bettableInCart = (bettableId: number, sideId: string) => {
        let cartBet = cartStore.bets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.sideId === sideId && cartBet.moneyline);
        return !!cartBet;
    };

    const getMoneyline = () => {
        let spreadPropName = team === 'TEAM1' ? 'team1MoneyLine' : 'team2MoneyLine';
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
            moneyline: true,
        };
        addBetToCart(bet);
    };

    let moneyline = getMoneyline();
    if (!bettable.off && moneyline) {
        let sideId = getSideId();
        let disabled = bettableInCart(bettable.id, sideId);
        return <FSWideButton disabled={disabled} onClick={betClick}>{moneyline}</FSWideButton>;
    } else {
        return <FSWideButton disabled={true}>OFF</FSWideButton>;
    }
});

export default MoneylineBettableButton;
