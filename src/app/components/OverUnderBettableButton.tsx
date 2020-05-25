import React from "react";
import {FSWideButton} from "./FSComponents";
import {Bettable, OverUnder} from "../types";
import {useGlobalStores} from "../context/global_context";
import {addBetToCart} from "../cart/cart.actions";
import {observer} from "mobx-react";

interface Props {
    bettable: Bettable;
    overunder: OverUnder;
}

const OverUnderBettableButton: React.FC<Props> = observer(({bettable, overunder}) => {

    const { cartStore } = useGlobalStores();

    const bettableInCart = (bettableId: number, overunder: OverUnder) => {
        let cartBet = cartStore.bets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overunder === overunder);
        return !!cartBet;
    };

    const betClick = () => {
        let bet = {bettableId: bettable.id, overunder: overunder};
        addBetToCart(bet);
    };

    if (!bettable.ouoff) {
        let disabled = bettableInCart(bettable.id, overunder);
        let overUnderName = overunder === 'OVER' ? "Over " : "Under ";
        return <FSWideButton className="hidden-xs hidden-sm" disabled={disabled}
                         onClick={betClick}>{overUnderName} {bettable.overunder}</FSWideButton>;
    } else {
        return <FSWideButton disabled={true}>O/U OFF</FSWideButton>;
    }

});

export default OverUnderBettableButton;
