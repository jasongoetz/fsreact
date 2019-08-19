import React, {Component} from "react";
import {FSButton} from "./FSComponents";
import {State} from "./GamesPage";
import {Bettable} from "../bettables/bettableReducer";
import {connect} from "react-redux";
import {getCartBets} from "../cart/cartSelector";
import {CartBet} from "../cart/cartReducer";
import {addBetToCart} from "../cart/cartActions";

interface Props {
    addBetToCart: (any) => void;
    cartBets: CartBet[];
    bettable: Bettable;
    team: number; //TODO: Replace this with an enum
}

class TeamBettableButton extends Component<Props, State> {

    bettableInCart = (bettableId: number, sideId: string) => {
        let cartBet = this.props.cartBets
            .find(cartBet => cartBet.bettable.id === bettableId && cartBet.sideId === sideId);
        return !!cartBet;
    };

    betClick = () => {
        let bet = {
            bettableId: this.props.bettable.id,
            sideId: this.getSideId()
        };
        this.props.addBetToCart(bet);
    };

    render() {
        if (!this.props.bettable.off) {
            let spread = this.getSpread();
            let sideId = this.getSideId();
            let disabled = this.bettableInCart(this.props.bettable.id, sideId);
            return <FSButton disabled={disabled} onClick={this.betClick}>{spread}</FSButton>;
        } else {
            return <FSButton disabled={true}>OFF</FSButton>;
        }
    }

    getSpread = () => {
        let spreadPropName = this.props.team == 1 ? 'team1Spread' : 'team2Spread';
        return this.props.bettable[spreadPropName];
    };

    getSideId = () => {
        let sideIdName = this.props.team == 1 ? 'sideId1' : 'sideId2';
        return this.props.bettable[sideIdName];
    };
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
)(TeamBettableButton);