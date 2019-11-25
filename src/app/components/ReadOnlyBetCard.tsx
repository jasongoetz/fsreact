import React, {Component} from "react";
import {Input, InputGroup, ListGroupItem, Row} from "reactstrap";
import {Bet} from "../types";
import moment from "moment";
import {getBetSummary, getGameSummary} from "../../util/BetUtil";

const betCardStyle = {
    backgroundColor: "#ececec",
    borderRadius: "0px",
    border: "1px solid",
    marginTop: "10px",
    marginBottom: "10px",
};

const betChoiceStyle = {
    paddingTop: '10px',
    paddingBottom: '20px',
};

export interface Props {
    bet: Bet;
    partOfParlay: boolean;
}

export interface State {
}

class ReadOnlyBetCard extends Component<Props, State> {

    async componentDidMount() {
    }

    render() {
        const bet = this.props.bet;
        return <ListGroupItem style={betCardStyle}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px'}}>
                    <div style={betChoiceStyle}>
                        <strong>{getBetSummary(bet)}</strong>
                    </div>
                    <div>{getGameSummary(bet)}</div>
                    <div>{moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}</div>
                </div>
                {!this.props.partOfParlay && this.getWagerFields(bet)
                }
            </div>
        </ListGroupItem>
    }

    private getWagerFields(bet) {
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px'}}>
            Wager ${bet.amount}, Win ${2 * (bet.amount || 0)}

        </div>;
    }
}

export default ReadOnlyBetCard;
