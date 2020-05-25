import React from "react";
import moment from "moment";
import {Bet, Parlay, BetOrParlayWrapper} from "../types";
import {Colors} from "../theme/theme";

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
        return Colors.green1;
    } else if (betOrParlay.value.outcome === 'LOSS') {
        return Colors.red1;
    } else if (betOrParlay.value.complete === true) {
        return Colors.yellow1;
    } else {
        return Colors.lighterGray;
    }
};

const getDescription = (betOrParlay: BetOrParlayWrapper) => {
    if (betOrParlay.type === 'parlay') {
        return `${(betOrParlay.value as Parlay).bets.length} Bet Parlay:`
    } else if (betOrParlay.value.sideId === betOrParlay.value.bettable.sideId1) {
        return `${betOrParlay.value.bettable.team1} ${betOrParlay.value.line} @ ${betOrParlay.value.bettable.team2}`
    } else if (betOrParlay.value.sideId === betOrParlay.value.bettable.sideId2) {
        return `${betOrParlay.value.bettable.team2} ${betOrParlay.value.line} vs ${betOrParlay.value.bettable.team1}`
    } else {
        return `${betOrParlay.value.overunder === 'OVER' ? " Over" : " Under"} ${betOrParlay.value.line} (${betOrParlay.value.bettable.team2} vs ${betOrParlay.value.bettable.team1})`
    }
};

const getBetDescription = (bet: Bet) => {
    if (bet.sideId === bet.bettable.sideId1) {
        return `${bet.bettable.team1} ${bet.line} @ ${bet.bettable.team2}`
    } else if (bet.sideId === bet.bettable.sideId2) {
        return `${bet.bettable.team2} ${bet.line} vs ${bet.bettable.team1}`
    } else {
        return `${bet.overunder === 'OVER' ? " Over" : " Under"} ${bet.line} (${bet.bettable.team2} vs ${bet.bettable.team1})`
    }
};

const getOutcome = (bet: Bet) => {
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

const vigFactor = (moneyline: string) => {
    let num = parseFloat(moneyline);
    return (num > 0) ? (num + 100) / 100 : (num < 0) ? (-num + 100) / -num : 1;
};

const getAmount = (betOrParlay: BetOrParlayWrapper, moneyline: string) => {
    if (betOrParlay.value.outcome === 'WIN') {
        if (betOrParlay.type === 'parlay') {
            return parlayWinnings((betOrParlay.value as Parlay), moneyline);
        } else {
            return betWinnings(betOrParlay.value, moneyline);
        }
    } else if (betOrParlay.value.outcome === 'LOSS') {
        return betOrParlay.value.amount;
    } else if (betOrParlay.value.complete === true) {
        return "-";
    } else {
        if (betOrParlay.type === 'parlay') {
            return `${betOrParlay.value.amount} to win ${parlayWinnings((betOrParlay.value as Parlay), moneyline, true)}`;
        } else {
            return betWinnings(betOrParlay.value, moneyline);
        }
    }
};

const betWinnings = (bet: Bet, moneyline: string) => {
    let winning = bet.amount * vigFactor(moneyline);
    winning = Math.round(winning * 100) / 100;
    return winning - bet.amount;
};

const parlayWinnings = (parlay: Parlay, moneyline: string, potential: boolean = false) => {
    let wonBets = parlay.bets.filter(bet => potential || bet.outcome === 'WIN');
    let amount = parlay.amount * Math.pow(vigFactor(moneyline), wonBets.length);
    return Math.round(amount * 100) / 100 - parlay.amount;
};

export const TransactionRow: React.FC<{ betOrParlay: BetOrParlayWrapper, moneyline: string }> = ({betOrParlay, moneyline}) => {
    let amount = getAmount(betOrParlay, moneyline);
    return (
        <React.Fragment>
            <tr style={{backgroundColor: getRowColor(betOrParlay)}}>
                <td>{betOrParlay.type === 'bet' ? moment(betOrParlay.value.bettable.gameTime).format("dddd, MMMM Do") : ''}</td>
                <td>{getDescription(betOrParlay)}</td>
                <td>{getOutcome(betOrParlay.value)}</td>
                <td>{typeof amount === 'number' ? amount.toFixed(2) : amount}</td>
                <td>{betOrParlay.tally.toFixed(2)}</td>
            </tr>
            {betOrParlay.type === 'parlay' && (betOrParlay.value as Parlay).bets.map((bet, index) => {
                return <tr key={`trr-${index}`} style={{backgroundColor: getRowColor(betOrParlay)}}>
                    <td style={{...parlayBetDateStyle, ...parlayBetRowStyle}}>{moment(bet.bettable.gameTime).format("dddd, MMMM Do")}</td>
                    <td style={{...parlayBetRowStyle, paddingLeft: "20px"}}>{getBetDescription(bet)}</td>
                    <td style={{...parlayBetRowStyle, ...parlayBetOutcomeStyle}}>{bet.outcome}</td>
                    <td style={parlayBetRowStyle}></td>
                    <td style={parlayBetRowStyle}></td>
                </tr>
            })}
        </React.Fragment>
    );
};
