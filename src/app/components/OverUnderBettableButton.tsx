import React, {Component} from "react";
import {FSButton} from "./FSComponents";
import {State} from "./GamesPage";
import {Bettable} from "../bettables/bettableReducer";
import {Input} from "reactstrap";
import {FSInput} from "./FSForm";

interface Props {
    bettable: Bettable;
    over: boolean; //TODO: Replace this with an enum
}

export class OverUnderBettableButton extends Component<Props, State> {

    bettableInCart = (bettableId: number, over: boolean) => {
        return false; //TODO: Implement
    };

    betClick = () => {
        alert(`Bettable ${this.props.bettable.id}, Over ${this.props.over} was clicked`);
    };

    render() {
        if (!this.props.bettable.ouoff) {
            let disabled = this.bettableInCart(this.props.bettable.id, this.props.over);
            let overUnderName = this.props.over ? "Over " : "Under ";
            return <FSButton disabled={disabled}
                             onClick={this.betClick}>{overUnderName} {this.props.bettable.overunder}</FSButton>;
        } else {
            return <FSButton disabled={true}>O/U OFF</FSButton>;
        }
    }

}