import React, {Component} from "react";
import {Col} from "reactstrap";
import {Bet, GamblerInfo, Parlay} from "../types";
import {Link} from "react-router-dom";
import moment from "moment";

export interface Props {
    gambler: GamblerInfo;
    bet: Bet;
    isParlay: boolean;
}

export interface State {
}

const betCardStyle = {
    margin: "10px 0"
};

const titleBarStyle = {
    padding: "5px 10px",
    backgroundColor: "whitesmoke",
    border: "solid 1px lightgray"
};

const wagerStyle = {
    float: "right" as "right"
};

const betCardContentStyle = {
    padding: "10px",
    width: "100%",
    backgroundColor: "#ececec",
    border: "solid 1px lightgray",
    borderTop: "0px"
};

class PendingBetCard extends Component<Props, State> {

    async componentDidMount() {
    }

    getBetHeadline = (bet: Bet, isParlay: boolean) => {
        if (isParlay) {
            let parlay = bet as Parlay;
            return `${parlay.bets.length} Bet Parlay`;
        }
        if (bet.sideId == bet.bettable.sideId1) {
            return `${bet.bettable.team1} ${bet.line}`;
        } else if (bet.sideId == bet.bettable.sideId2) {
            return `${bet.bettable.team2} ${bet.line}`;
        } else {
            return `${(bet.overunder === 'OVER' ? "Over" : "Under")} ${bet.line}`;
        }
    };

    getWager = (bet: Bet, isParlay: boolean) => {
        if (isParlay) {
            let parlay: Parlay = bet as Parlay;
            return `$${parlay.amount} (to win $${parlay.amount * Math.pow(2, parlay.bets.length)})`
        }
        else {
            return `$${bet.amount}`;
        }
    };

    render() {
        let bet = this.props.bet;
        let isParlay = this.props.isParlay;
        let gambler = this.props.gambler;
        return <Col lg={4} sm={6} xs={12} style={betCardStyle}>
            <div style={titleBarStyle}>
                <div style={wagerStyle}>{this.getWager(bet, isParlay)}</div>
                <div>{gambler.user.firstName} {gambler.user.lastName}</div>
            </div>
            <div style={betCardContentStyle}>
                <div style={{fontWeight: "bold"}}>
                    {this.getBetHeadline(bet, isParlay)}
                </div>
                <div>
                    {isParlay && <Link to={`/transaction/show/${gambler.id}`}>View Details</Link>}
                    {!isParlay && `${bet.bettable.team1} @ ${bet.bettable.team2}`}
                </div>
                <div>
                    {!isParlay && moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}
                    {isParlay && <span>&nbsp;</span>}
                </div>
            </div>
        </Col>
    }
}


export default PendingBetCard;
