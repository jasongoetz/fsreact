import {getBetsForLeague} from "../api/api";
import {betStore} from "./bet.store";

export const loadBets = async (leagueId: number) => {
    const bets = await getBetsForLeague(leagueId);
    betStore.saveBets(bets);
}
