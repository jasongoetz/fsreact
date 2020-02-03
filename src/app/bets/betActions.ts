import {getBetsForLeague} from "../api/api";
import {BetContext, mutate} from "./betContext";

export const loadBets = async (leagueId: number) => {
    const bets = await getBetsForLeague(leagueId);

    mutate((draft: BetContext) => {
        draft.betsAndParlaysByGambler = bets;
    });
};



