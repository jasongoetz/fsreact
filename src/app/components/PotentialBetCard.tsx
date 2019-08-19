import React, {Component} from "react";
import {Button, Col, Input, ListGroupItem, Row} from "reactstrap";
import {Bet, GamblerInfo, Parlay} from "../types";
import {Link} from "react-router-dom";
import moment from "moment";

const potentialBetStyle = {
    backgroundColor: "#ececec",
    borderRadius: "0px",
    borderBottom: "0px",
    borderTop: "1px solid",
    borderLeft: "0px",
    borderRight: "0px",
};

const betAmountStyle = {
    position: "absolute" as "absolute",
    bottom: "15px",
    right: "15px",
    width: "65px",
    textAlign: "right" as "right",
};

export const inputGroupAddOn = {
    borderRadius: "0px",
    padding: "4px 6px",
    backgroundColor: "#FFFFFF",
};

const closeStyle = {
    fontWeight: "normal" as "normal",
    opacity: 0.5,
};

export interface Props {
    cartId: number;
    bet: Bet;
    partOfParlay: boolean;
    confirmation: boolean;
    onClose: (cartId: number) => void;
    onEdit: (cartId: number, amount: number) => void;
}

export interface State {
}

class PotentialBetCard extends Component<Props, State> {

    async componentDidMount() {
    }

    render() {
        const bet = this.props.bet;
        return <ListGroupItem style={potentialBetStyle}>
            {!this.props.confirmation &&
                <Button style={closeStyle} close onClick={() => this.props.onClose(this.props.cartId)}>
                    <span>&times;</span>
                </Button>
            }
            <Row>
                <Col xs={9}>
                    <p><strong>{this.getBetSummary(bet)}</strong></p>
                    <p>{moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}</p>
                    <p>{this.getGameSummary(bet)}</p>
                </Col>
            </Row>
            {!this.props.partOfParlay && this.props.confirmation &&
                <div style={betAmountStyle}>
                    <span>Amount: ${bet.amount}</span>}
                </div>
            }
            {!this.props.partOfParlay && !this.props.confirmation &&
                <div className="input-group bet-amount-container">
                    <span style={inputGroupAddOn}>$</span>
                    <Input
                        type="number"
                        min="0" step="1"
                        style={betAmountStyle}
                        value={bet.amount}
                        onChange={(e) => this.props.onEdit(this.props.cartId, parseInt(e.target.value))}
                    />
                </div>
            }
        </ListGroupItem>
    }

    private getBetSummary(bet: Bet) {
        if (bet.sideId == bet.bettable.sideId1) {
            return `${bet.bettable.team1} ${bet.bettable.team1Spread}`;
        } else if (bet.sideId == bet.bettable.sideId2) {
            return `${bet.bettable.team2} ${bet.bettable.team2Spread}`;
        } else if (bet.overunder != null) {
            return (bet.overunder==='OVER' ? "Over " : "Under ") + bet.bettable.overunder;
        }
    }

    private getGameSummary(bet: Bet) {
        if (bet.overunder!= null || bet.sideId == bet.bettable.sideId1) {
            return `${bet.bettable.team1} at ${bet.bettable.team2}`;
        } else {
            return `${bet.bettable.team2} at ${bet.bettable.team1}`;
        }
    }
}

export default PotentialBetCard;
