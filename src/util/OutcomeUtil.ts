import {Bet, GameScore} from "../app/types";

type Outcome = 'WIN' | 'LOSS' | 'PUSH' | 'LIKELY_WIN' | 'LIKELY_LOSS' | 'UNDECIDED';

export const getUnofficialBetOutcome = (bet: Bet, score: GameScore): Outcome => {

    const final = score.clockStatus === 'STATUS_FINAL';
    if (!final) {
        return 'UNDECIDED';
    }

    if (bet.overunder != null && bet.overunder.length > 0) {
        let totalGameScore = score.team1Score + score.team2Score;
        let betOverUnder = parseFloat(bet.line);
        if (betOverUnder === totalGameScore) {
            return 'PUSH';
        }
        else if (totalGameScore > betOverUnder) {
            return (bet.overunder === "OVER") ? 'WIN' : 'LOSS';
        }
        else {
            return (bet.overunder === "UNDER") ? 'WIN' : 'LOSS';
        }
    } else {
        let line = parseFloat(bet.line);
        let bettersPickScore = (bet.sideId === bet.bettable.sideId1) ? score.team2Score : score.team1Score; //TODO: This is backwards, like the rest
        let bettersAdjustedScore = bet.moneyline ? bettersPickScore : (bettersPickScore + line);
        let bettersOpponentScore = (bet.sideId === bet.bettable.sideId1) ? score.team1Score : score.team2Score; //TODO: This is backwards, like the rest

        if (bettersAdjustedScore > bettersOpponentScore) {
            return 'WIN';
        }
        else if (bettersAdjustedScore < bettersOpponentScore) {
            return 'LOSS';
        }
        else {
            return 'PUSH';
        }
    }
}
