import React from "react";
import { FSWideButton, OffButton } from "./FSComponents";
import {Bettable, OverUnder} from "../types";
import {useGlobalStores} from "../context/global_context";
import {addBetToCart} from "../cart/cart.actions";
import {observer} from "mobx-react";

interface Props {
    bettable: Bettable;
    overUnder: OverUnder;
    isMobile: boolean;
}

const OverUnderBettableButton: React.FC<Props> = observer(({bettable, overUnder, isMobile, ...props}) => {

    const { cartStore } = useGlobalStores();

    const bettableInCart = (bettableId: number, overUnder: OverUnder) => {
        let cartBet = cartStore.bets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overUnder === overUnder);
        return !!cartBet;
    };

    const betClick = () => {
        let bet = {bettable: bettable, overUnder: overUnder, moneyline: false};
        addBetToCart(bet);
    };

    if (!bettable.ouoff) {
        let disabled = bettableInCart(bettable.id, overUnder);
        let overUnderName = overUnder === OverUnder.OVER ? "Over " : "Under ";
        if (isMobile) {
            overUnderName = overUnderName.slice(0, 1);
        }
        return <FSWideButton className="hidden-xs hidden-sm" disabled={disabled}
                         onClick={betClick} {...props}>{overUnderName} {bettable.overUnder}</FSWideButton>;
    } else {
        return <OffButton disabled={true}>O/U OFF</OffButton>;
    }

});

export default OverUnderBettableButton;
