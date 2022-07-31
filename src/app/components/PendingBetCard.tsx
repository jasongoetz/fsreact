import React from 'react';
import {Col} from 'reactstrap';
import {Bet, GamblerInfo, OverUnder, Parlay, Wager} from '../types';
import moment from 'moment';
import {Colors} from '../theme/theme';
import {getParlayWinnings} from '../../util/MoneylineUtil';
import {FSLink} from "./FSComponents";

interface Props {
    gambler: GamblerInfo;
    bet: Bet;
    isParlay: boolean;
    leagueMoneyline: number;
}

const betCardStyle = {
    margin: "10px 0"
};

const titleBarStyle = {
    padding: "5px 10px",
    backgroundColor: Colors.whiteSepia,
    border: `solid 1px ${Colors.graySepia}`
};

const wagerStyle = {
    float: "right" as "right"
};

const betCardContentStyle = {
    padding: "10px",
    width: "100%",
    backgroundColor: Colors.lightestGraySepia,
    border: `solid 1px ${Colors.graySepia}`,
    borderTop: "0px"
};

const PendingBetCard: React.FC<Props> = ({gambler, bet, isParlay, leagueMoneyline}) => {

    const getBetHeadline = (wager: Wager, isParlay: boolean) => {
        if (isParlay) {
            const parlay = wager as Parlay;
            return `${parlay.bets.length} Bet Parlay`;
        }
        else {
            const bet  = wager as Bet;
            if (bet.sideId === bet.bettable.sideId1) {
                return `${bet.bettable.team1} ${bet.line}`;
            } else if (bet.sideId === bet.bettable.sideId2) {
                return `${bet.bettable.team2} ${bet.line}`;
            } else {
                return `${(bet.overUnder === OverUnder.OVER ? "Over" : "Under")} ${bet.line}`;
            }
        }
    };

    const getWager = (wager: Wager, isParlay: boolean, leagueMoneyline: number) => {
        if (isParlay) {
            const parlay = wager as Parlay;
            return `$${parlay.amount} (to win $${getParlayWinnings(parlay.amount, parlay.bets, leagueMoneyline)})`
        }
        else {
            return `$${wager.amount}`;
        }
    };

    return <Col lg={4} sm={6} xs={12} style={betCardStyle}>
        <div style={titleBarStyle}>
            <div style={wagerStyle}>{getWager(bet, isParlay, leagueMoneyline)}</div>
            <div>{gambler.user.firstName} {gambler.user.lastName}</div>
        </div>
        <div style={betCardContentStyle}>
            <div style={{fontWeight: "bold"}}>
                {getBetHeadline(bet, isParlay)}
            </div>
            <div>
                {isParlay && <FSLink to={`/transaction/show/${gambler.id}`}>View Details</FSLink>}
                {!isParlay && `${bet.bettable.team1} @ ${bet.bettable.team2}`}
            </div>
            <div>
                {!isParlay && moment(bet.bettable.gameTime).format("dddd, MMM Do, h:mma z")}
                {isParlay && <span>&nbsp;</span>}
            </div>
        </div>
    </Col>
}

export default PendingBetCard;
