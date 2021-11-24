import {Bet, CartBet} from "../app/types";

const getVigFactor = (moneyline: number) => {
    return (moneyline > 0) ? (moneyline+100)/100 : (moneyline < 0) ? (-moneyline+100)/-moneyline : 1;
}

export const getParlayWinnings = (parlayAmount, parlayBets: (Bet | CartBet)[], leagueMoneyline: number) => {
    const parlayBetMoneylines = parlayBets.map(bet => bet.moneyline ? parseInt(bet.line) : leagueMoneyline)
    let totalAmount = parlayAmount;
    for (let i=0; i<parlayBetMoneylines.length; i++) {
        totalAmount *= getVigFactor(parlayBetMoneylines[i]);
    }
    return totalAmount.toFixed(2);
}

export const getBetWinnings = (bet: Bet | CartBet, leagueMoneyline: number) => {
    const betAmount = bet.amount;
    const moneyline = bet.moneyline ? parseInt(bet.line) : leagueMoneyline;
    const vigFactor = getVigFactor(moneyline);
    return (betAmount * (vigFactor)).toFixed(2);
}

