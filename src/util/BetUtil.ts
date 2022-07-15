import { CartBet, OverUnder } from '../app/types';
import Pluralize from 'pluralize';

export const getBetSummary = (bet: CartBet) => {
    if (bet.sideId === bet.bettable.sideId1) {
        if (bet.moneyline) {
            return `${bet.bettable.team1} to win (${bet.bettable.team1MoneyLine})`;
        } else {
            return `${bet.bettable.team1} ${bet.bettable.team1Spread}`;
        }
    } else if (bet.sideId === bet.bettable.sideId2) {
        if (bet.moneyline) {
            return `${bet.bettable.team2} to win (${bet.bettable.team2MoneyLine})`;
        } else {
            return `${bet.bettable.team2} ${bet.bettable.team2Spread}`;
        }
    } else if (bet.overUnder != null) {
        return (bet.overUnder === OverUnder.OVER ? "Over " : "Under ") + bet.bettable.overUnder;
    }
};

export const getGameSummary = (bet: CartBet) => {
    if (bet.overUnder != null || bet.sideId === bet.bettable.sideId1) {
        return `${bet.bettable.team1} at ${bet.bettable.team2}`;
    } else {
        return `${bet.bettable.team2} at ${bet.bettable.team1}`;
    }
};

export const getButtonMessage = (actionVerb: string, numBets: number, totalAmount: number, parlayActive: boolean) => {
    if (parlayActive) {
        return `${actionVerb} ${numBets} bet parlay for $${totalAmount}`;
    }
    else {
        return `${actionVerb} ${Pluralize('bet', numBets, true)} for $${totalAmount}`;
    }
};
