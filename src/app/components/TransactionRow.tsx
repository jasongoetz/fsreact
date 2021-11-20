import React from "react";
import moment from "moment";
import {Bet, Parlay, BetOrParlayWrapper, Wager} from "../types";
import {Colors} from "../theme/theme";
import {getBetWinnings, getParlayWinnings} from "../../util/MoneylineUtil";

const parlayBetRowStyle = {
    borderTop: "0px",
    lineHeight: "1.0",
    fontSize: "12px",
    padding: "8px",
    color: Colors.darkestGray
};

const parlayBetDateStyle = {
    paddingLeft: "15px"
};

const parlayBetOutcomeStyle = {
    paddingLeft: "15px"
};

const getRowColor = (betOrParlay: BetOrParlayWrapper) => {
    if (betOrParlay.value.outcome === 'WIN') {
        return Colors.washedGreen;
    } else if (betOrParlay.value.outcome === 'LOSS') {
        return Colors.washedRed;
    } else if (betOrParlay.value.complete === true) {
        return Colors.washedYellow;
    } else {
        return Colors.lightestGraySepia;
    }
};

const getDescription = (betOrParlay: BetOrParlayWrapper) => {
    if (betOrParlay.type === 'parlay') {
        const parlay = betOrParlay.value as Parlay;
        return `${parlay.bets.length} Bet Parlay:`
    } else {
        const bet = betOrParlay.value as Bet;
        return getBetDescription(bet);
    }
};

const getBetDescription = (bet: Bet) => {
    if (bet.infoRedacted) {
        return '[Info Redacted]';
    }
    if (bet.sideId === bet.bettable.sideId1) {
        return `${bet.bettable.team1} ${bet.line} @ ${bet.bettable.team2}`
    } else if (bet.sideId === bet.bettable.sideId2) {
        return `${bet.bettable.team2} ${bet.line} vs ${bet.bettable.team1}`
    } else {
        return `${bet.overunder === 'OVER' ? " Over" : " Under"} ${bet.line} (${bet.bettable.team2} vs ${bet.bettable.team1})`
    }
};

const getOutcome = (bet: Wager) => {
    if (bet.outcome === 'WIN') {
        return "WIN";
    } else if (bet.outcome === 'LOSS') {
        return "LOSS";
    } else if (bet.complete === true) {
        return "PUSH";
    } else {
        return "PENDING";
    }
};

const getWinnings = (betOrParlay: BetOrParlayWrapper, moneyline: number) => {
    if (betOrParlay.value.outcome === 'WIN') {
        if (betOrParlay.type === 'parlay') {
            const parlay = betOrParlay.value as Parlay;
            return getParlayWinnings(parlay.amount, parlay.bets.filter(b => b.outcome === 'WIN').map(bet => bet.moneyline ? parseInt(bet.line) : moneyline));
        } else {
            const bet = betOrParlay.value as Bet;
            return getBetWinnings(bet.amount, moneyline);
        }
    } else if (betOrParlay.value.outcome === 'LOSS') {
        return '--';
    } else if (betOrParlay.value.complete === true) {
        return betOrParlay.value.amount;
    } else {
        if (betOrParlay.type === 'parlay') {
            const parlay = betOrParlay.value as Parlay;
            return `${betOrParlay.value.amount} to win ${getParlayWinnings(parlay.amount, parlay.bets.map(bet => bet.moneyline ? parseInt(bet.line) : moneyline))}`;
        } else {
            const bet = betOrParlay.value as Bet;
            return getBetWinnings(bet.amount, moneyline);
        }
    }
};

export const TransactionRow: React.FC<{ betOrParlay: BetOrParlayWrapper, moneyline: number }> = ({betOrParlay, moneyline}) => {
    let amount = betOrParlay.value.amount;
    let winnings = getWinnings(betOrParlay, moneyline);
    return (
        <React.Fragment>
            <tr style={{backgroundColor: getRowColor(betOrParlay)}}>
                <td>{betOrParlay.type === 'bet' ? moment((betOrParlay.value as Bet).bettable.gameTime).format("dddd, MMMM Do") : ''}</td>
                <td>{getDescription(betOrParlay)}</td>
                <td>{getOutcome(betOrParlay.value as Wager)}</td>
                <td>{typeof amount === 'number' ? amount.toFixed(2) : amount}</td>
                <td>{typeof winnings === 'number' ? winnings.toFixed(2) : winnings}</td>
                <td>{betOrParlay.tally.toFixed(2)}</td>
            </tr>
            {betOrParlay.type === 'parlay' && (betOrParlay.value as Parlay).bets.map((bet, index) => {
                return <tr key={`trr-${index}`} style={{backgroundColor: getRowColor(betOrParlay)}}>
                    <td style={{...parlayBetDateStyle, ...parlayBetRowStyle}}>{moment(bet.bettable.gameTime).format("dddd, MMMM Do")}</td>
                    <td style={{...parlayBetRowStyle, paddingLeft: "20px"}}>{getBetDescription(bet)}</td>
                    <td style={{...parlayBetRowStyle, ...parlayBetOutcomeStyle}}>{bet.outcome}</td>
                    <td style={parlayBetRowStyle}/>
                    <td style={parlayBetRowStyle}/>
                    <td style={parlayBetRowStyle}/>
                </tr>
            })}
        </React.Fragment>
    );
};
