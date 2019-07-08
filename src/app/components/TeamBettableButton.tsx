import React, {Component} from "react";
import {FSButton} from "./FSComponents";
import {State} from "./GamesPage";
import {Bettable} from "../bettables/bettableReducer";

interface Props {
    bettable: Bettable;
    team: number; //TODO: Replace this with an enum
}

export class TeamBettableButton extends Component<Props, State> {

    bettableInCart = (bettableId: number, team: number) => {
        return false; //TODO: Implement
    };

    betClick = () => {
        alert(`Bettable ${this.props.bettable.id}, Team ${this.props.team} was clicked`);
    };

    render() {
        if (!this.props.bettable.off) {
            let disabled = this.bettableInCart(this.props.bettable.id, this.props.team);
            let spreadPropName = this.props.team == 1 ? 'team1Spread' : 'team2Spread';
            let spread = this.props.bettable[spreadPropName];
            return <FSButton disabled={disabled} onClick={this.betClick}>{spread}</FSButton>;
        } else {
            return <FSButton disabled={true}>OFF</FSButton>;
        }
    }

}