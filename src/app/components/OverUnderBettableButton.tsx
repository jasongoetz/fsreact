import React, {Component} from "react";
import {FSButton, FSWideButton} from "./FSComponents";
import {State} from "./GamesPage";
import {Bettable} from "../bettables/bettableReducer";
import {getCartBets} from "../cart/cartSelector";
import {connect} from "react-redux";
import {CartBet} from "../cart/cartReducer";
import {OverUnder} from "../bets/betReducer";
import {loadUserContext} from "../user/userActions";
import {loadGames} from "../bettables/bettableActions";
import {addBetToCart} from "../cart/cartActions";

interface Props {
    addBetToCart: (any) => void;
    cartBets: CartBet[];
    bettable: Bettable;
    overunder: OverUnder;
}

class OverUnderBettableButton extends Component<Props, State> {

    bettableInCart = (bettableId: number, overunder: OverUnder) => {
        let cartBet = this.props.cartBets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.overunder === overunder);
        return !!cartBet;
    };

    betClick = () => {
        let bet = {bettableId: this.props.bettable.id, overunder: this.props.overunder};
        this.props.addBetToCart(bet);
    };

    render() {
        if (!this.props.bettable.ouoff) {
            let disabled = this.bettableInCart(this.props.bettable.id, this.props.overunder);
            let overUnderName = this.props.overunder === 'OVER' ? "Over " : "Under ";
            return <FSWideButton className="hidden-xs hidden-sm" disabled={disabled}
                             onClick={this.betClick}>{overUnderName} {this.props.bettable.overunder}</FSWideButton>;
        } else {
            return <FSWideButton disabled={true}>O/U OFF</FSWideButton>;
        }
    }

}

const mapStateToProps = (state: State) => {
    return {
        cartBets: getCartBets(state),
    };
};

const mapDispatchToProps = {
    addBetToCart,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OverUnderBettableButton);