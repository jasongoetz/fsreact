import React from "react";
import {FSWideButton} from "./FSComponents";
import {OverUnder} from "../types";
import {useGlobalStores} from "../context/global_context";
import {addBetToCart} from "../cart/cart.actions";
import {observer} from "mobx-react";
import { Bettable } from "../../graphql/generated";

interface Props {
    bettable: Bettable;
    overunder: OverUnder;
    isMobile: boolean;
}

const OverUnderBettableButton: React.FC<Props> = observer(({bettable, overunder, isMobile}) => {

    const { cartStore } = useGlobalStores();

    const bettableInCart = (bettableId: number, overunder: OverUnder) => {
        let cartBet = cartStore.bets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overunder === overunder);
        return !!cartBet;
    };

    const betClick = () => {
        let bet = {bettable: bettable, overunder: overunder, moneyline: false};
        addBetToCart(bet);
    };

    if (!bettable.ouoff) {
        let disabled = bettableInCart(bettable.id, overunder);
        let overUnderName = overunder === 'OVER' ? "Over " : "Under ";
        if (isMobile) {
            overUnderName = overUnderName.slice(0, 1);
        }
        return <FSWideButton className="hidden-xs hidden-sm" disabled={disabled}
                         onClick={betClick}>{overUnderName} {bettable.overunder}</FSWideButton>;
    } else {
        return <FSWideButton disabled={true}>O/U OFF</FSWideButton>;
    }

});

export default OverUnderBettableButton;
