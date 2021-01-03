import React from "react";
import {ListGroupItem} from "reactstrap";
import {CartBet} from "../types";
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

interface Props {
    bet: CartBet;
    partOfParlay: boolean;
}

const ReadOnlyBetCard: React.FC<Props> = ({bet, partOfParlay}) => {

    const getWagerFields = (bet) => {
        return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10px'}}>
            Wager ${bet.amount}, Win ${2 * (bet.amount || 0)}

        </div>;
    };

    return <ListGroupItem style={betCardStyle}>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '10px'}}>
                <div style={betChoiceStyle}>
                    <strong>{getBetSummary(bet)}</strong>
                </div>
                <div>{getGameSummary(bet)}</div>
                <div>{moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}</div>
            </div>
            {!partOfParlay && getWagerFields(bet)}
        </div>
    </ListGroupItem>

}

export default ReadOnlyBetCard;
